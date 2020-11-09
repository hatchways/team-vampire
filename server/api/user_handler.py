import json
from flask import jsonify, request, Blueprint, session
from datetime import datetime
from api.login_decorator import login_required
from pytz import all_timezones

# Models
from models.shared import db
from models.user import User

user_handler = Blueprint('user_handler', __name__)


@user_handler.route('/user/<path:username>', methods=["GET"])
def user(username=None):
    if request.method == "GET":
        if username is None:
            return jsonify({
                "status": "error",
                "message": "'username' field not provided"
            }), 400

        # search for the username:
        user = User.query.filter_by(username=username.lower()).first()
        if user is None:
            return jsonify({
                "status": "error",
                "message": "User does not exist."
            }), 404
        # If we want to only allow the user who is logged in to get their own
        # email, we can just check the session and look up the user and then
        # output it. Otherwise, if we don't mind making it public data, this
        # works just fine.
        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "timezone": user.timezone
        }), 200

@user_handler.route('/user', methods=["GET", "POST", "PATCH", "DELETE"])
@login_required
def user_protected():
    sess = dict(session)
    user = User.query.filter_by(email=sess["profile"]["email"]).first()

    # user can be logged in, as in they can have a session
    # without actually having a user database entry because
    # google oauth is done first, then we create the user row!
    if request.method == "GET":        
        # Since this is a logged in user and they are requesting their
        # own information, we can include things like stripe_customer_id
        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "timezone": user.timezone,
            "stripe_customer_id": user.stripe_customer_id,
            "updated_at": user.updated_at,
            "created_at": user.created_at
        }), 200
    elif request.method == "PATCH":       
        updated_fields = []
        
        first_name = request.json.get("first_name", None)
        last_name = request.json.get("last_name", None)
        timezone = request.json.get("timezone", None)
        username = request.json.get("username", None)

        if first_name or last_name:
            if first_name is not None:
                user.first_name = first_name
                updated_fields.append("first name")
            
            if last_name is not None:
                user.last_name = last_name
                updated_fields.append("last name")
        
        if timezone:
            if timezone not in all_timezones:
                return jsonify({
                    "status": "error",
                    "message": "Please enter a valid timezone"
                }), 400
            
            user.timezone = timezone
            updated_fields.append("timezone")
            
        # cant set to their own username:
        if username == user.username:
            return jsonify({
                    "status": "error",
                    "message": "That is already your username"
                }), 400
        if username:
            # Make sure username isn't taken:
            if User.query.filter_by(username=username).first():
                return jsonify({
                    "status": "error",
                    "message": "Username is already taken, try something else!"
                }), 400
            user.username = username
            updated_fields.append("username")
        
        if len(updated_fields) > 0:
            # Updated a field:
            user.updated_at = datetime.utcnow()
            db.session.commit()
            return jsonify({
                "status": "success",
                "message": "Updated the following fields: " + ", ".join(updated_fields)
            }), 200
        
        return jsonify({
            "status": "error",
            "message": "Nothing updated, no valid field provided"
        }), 422

    elif request.method == "DELETE":
        # Remove the user!
        # Do we need to do anything on googles end?
        try:
            User.query.filter_by(email=sess["profile"]["email"]).delete()
            db.session.commit()
            return jsonify({
                "status": "success",
                "message": "Successfully deleted user account."
            }), 200
        except:
            return jsonify({}), 400
    else:
        return jsonify({}), 405