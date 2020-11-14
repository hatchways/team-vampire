import json, re
from flask import jsonify, request, Blueprint, session
from datetime import datetime
from api.login_decorator import login_required
from pytz import all_timezones

# Models
from models.shared import db
from models.user import User
from models.availability import Availability


availability_handler = Blueprint('availability_handler', __name__)
@availability_handler.route('/availabilities', methods=["GET"])
@login_required
def availability_get():
    sess = dict(session)
    user = User.query.filter_by(email=sess["profile"]["email"]).first()


    if user is None:
        return jsonify({
            "status": "error",
            "message": "Please complete setting up your profile first."
        }), 400
    # We need to output the following:
    # - name, description, duration
    # Should we only display upcoming appointments or show everything?
    # should we use query parameters to limit the output and or view based on date?
    output = []
    # Get just the meeting ids, no need for other fields
    availabilities = Availability.query.filter_by(user_id=user.id)
    for availability in availabilities:
        output.append({
            "id": availability.id,
            "day": availability.day,
            "start_time": availability.start_time,
            "end_time": availability.end_time,
            "created_at": availability.created_at,
            "updated_at": availability.updated_at
        })
    return jsonify({"availabilities": output}), 200


@availability_handler.route('/availability', methods=["POST"])
@login_required
def availability_create():
    sess = dict(session)
    user = User.query.filter_by(email=sess["profile"]["email"]).first()


    if user is None:
        return jsonify({
            "status": "error",
            "message": "Please complete setting up your profile first."
        }), 400

    day = request.json.get("day", None)
    start_time = request.json.get("start_time", None)
    end_time = request.json.get("end_time", None)

    # Some preliminary checks 
    if day is None or day not in range(1, 8):
        return jsonify({
            "status": "error",
            "message": "Invalid date format, must be between 1 and 7"
        }), 400

    if start_time is None or type(start_time) != int:
        return jsonify({
            "status": "error",
            "message": "Invalid start time format must be int"
        }), 400
    
    if end_time is None or type(end_time) != int:
        return jsonify({
            "status": "error",
            "message": "Invalid end time format must be int"
        }), 400
    
    if start_time > end_time:
        return jsonify({
            "status": "error",
            "message": "Start time must be before end time"
        }), 400
    
    if start_time not in range(1, 1441) or end_time not in range(1, 1441):
        return jsonify({
            "status": "error",
            "message": "Both times must be between 1 and 1440 minutes."
        }), 400

    # TODO: We should probably check that the new availability does not
    # interupt or override another availability.

    # all checks went through, time to create availability:
    new_availability = Availability(
        user_id=user.id, 
        day=day,
        start_time=start_time,
        end_time=end_time
    )

    
    # Save to db:
    db.session.add(new_availability)
    db.session.commit()

    # time needs to be in the future.
    return jsonify({
        "status": "success",
        "message": "Availability added successfully!"
    }), 200
