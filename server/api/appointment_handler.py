import json, re
from flask import jsonify, request, Blueprint, session
from datetime import datetime
from api.login_decorator import login_required
from pytz import all_timezones

# Models
from models.shared import db
from models.user import User
from models.meeting import Meeting
from models.appointment import Appointment

EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")

appointment_handler = Blueprint('appointment_handler', __name__)

@appointment_handler.route('/appointments', methods=["GET"])
@login_required
def appointment_get():
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
    appointments = Appointment.query.join(Meeting).filter(Meeting.user_id == user.id).all()
    
    for appointment in appointments:
        output.append({
            "id": appointment.id,
            "name": appointment.name,
            "email": appointment.email,
            "time": appointment.time,
            "timezone": appointment.timezone,
            "created_at": appointment.created_at,
            "updated_at": appointment.updated_at
        })
    return jsonify({"appointments": output}), 200


@appointment_handler.route('/appointment', methods=["POST"])
def appointment_create():
    # TODO: here is a good place to check for the "plan" they are signed up for
    # and based on their plan we can determine if they have maxiumum meetings already, etc 
    meeting_id = request.json.get("meeting_id", None)
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    time = request.json.get("time", None)
    timezone = request.json.get("timezone", None)

    # Some preliminary checks 
    if meeting_id is None or Meeting.query.filter_by(id=meeting_id).first() is None:
        return jsonify({
            "status": "error",
            "message": "Invalid meeting id format or this meeting does not exist"
        }), 400
    if name is None or (len(name) <= 0 or len(name) > 50):
        return jsonify({
            "status": "error",
            "message": "Name length must be between 1 and 50 characters"
        }), 400
    if email is None or type(email) != str or not EMAIL_REGEX.fullmatch(email):
        return jsonify({
            "status": "error",
            "message": "Invalid email format, please try again."
        }), 400
    
    if time is None:
        return jsonify({
            "status": "error",
            "message": "Time cannot be empty"
        }), 400
    else:
        try:
            # try to convert the time first:
            time = datetime.utcfromtimestamp(int(time))
            if time < datetime.utcnow():
                # time is in the past, no can do!
                return jsonify({
                    "status": "error",
                    "message": "Time cannot be in the past, please try again!"
                }), 400
        except:
            return jsonify({
                "status": "error",
                "message": "Invalid time provided."
            }), 400

    if timezone not in all_timezones:
        return jsonify({
            "status": "error",
            "message": "Please enter a valid timezone"
        }), 400

    # all checks went through, time to create appointment:
    new_appointment = Appointment(
        meeting_id=meeting_id, 
        name=name,
        email=email,
        time=time,
        timezone=timezone 
    )

    # TODO: We should probably check that the meeting appointment time falls
    # within the timeframe that is available with the user AND is has no conflicts
    # with other appointments that the user might have.

    # TODO: Send email to organizer and to the person requesting the appointment
    
    # Save to db:
    db.session.add(new_appointment)
    db.session.commit()

    # time needs to be in the future.
    return jsonify({
        "status": "success",
        "message": "Appointment created successfully!"
    }), 200