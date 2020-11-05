import json
from flask import jsonify, request, Blueprint, session
from datetime import datetime
from api.login_decorator import login_required

# Models
from models.shared import db
from models.user import User
from models.meeting import Meeting


meeting_handler = Blueprint('meeting_handler', __name__)

@meeting_handler.route('/meetings', methods=["GET"])
@meeting_handler.route('/meeting', methods=["POST"])
@login_required
def meeting_route():
    sess = dict(session)
    user = User.query.filter_by(email=sess["profile"]["email"]).first()

    # If the user object doesn't exist (it should), it just means the
    # POST -> /user wasn't done and therefore we don't have any data on
    # this user in the database, we just have a session

    if user is None:
        return jsonify({
            "status": "error",
            "message": "Please complete setting up your profile first."
        }), 400

    if request.method == "GET":
        # We need to output the following:
        # - name, description, duration
        output = []
        meetings = Meeting.query.filter_by(user_id=user.id)
        for meeting in meetings:
            output.append({
                "id": meeting.id,
                "name": meeting.name,
                "description": meeting.description,
                "duration": meeting.duration,
                "created_at": meeting.created_at,
                "updated_at": meeting.updated_at
            })
        return jsonify({"meetings": output}), 200
    elif request.method == "POST":
        # TODO: here is a good place to check for the "plan" they are signed up for
        # and based on their plan we can determine if they have maxiumum meetings already, etc 
        # We need to check for the following fields:
        # - name
        # - description
        # - duration
        # if none of these are provided, we assume we are just creating a default
        # meeting record, 60 minutes.
        name = request.json.get("name", None)
        description = request.json.get("description", None)
        duration = request.json.get("duration", None)
        # Maybe some preliminary checks? 
        if name is not None and len(name) > 255:
            return jsonify({
                "status": "error",
                "message": "Name length must be between 1 and 255 characters"
            }), 400
        if duration is not None:
            if type(duration) != int:
                return jsonify({
                    "status": "error",
                    "message": "Invalid duration data type, must be an int"
                }), 400
            if duration > 1440:
                # greater than 1 day? not possible?
                # or should this be allowed, OR should this be even shorter?
                return jsonify({
                    "status": "error",
                    "message": "Duration cannot be greater than one day."
                }), 400
        
        # Assuming all checks went through:
        try:
            new_meeting = Meeting(user_id=user.id, name=name, description=description, duration=duration)
            db.session.add(new_meeting)
            db.session.commit()
            return jsonify({
                "status": "success",
                "message": "Successfully added meeting for user"
            }), 200
        except:
            return jsonify({
                "status": "error",
                "message": "Something went wrong, please try again later"
            }), 400
    else:
        return jsonify({}), 405
