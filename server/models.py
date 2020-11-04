from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Timezone should default to the meeting creators timezone?
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    meeting_id = db.Column(db.Integer, db.ForeignKey("meeting.id"))
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(80), unique=False, nullable=False)
    time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    timezone = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


class Meeting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    name = db.Column(db.String(255), nullable=False, default="60 Minute Meeting")
    description = db.Column(db.Text, default="One-on-one")
    duration = db.Column(db.Integer, nullable=False, default=60)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    appointments = db.relationship("Appointment", backref="meeting")


class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    day = db.Column(db.Integer, nullable=False)
    start_time = db.Column(db.Integer, nullable=False, default=540)
    end_time = db.Column(db.Integer, nullable=False, default=1020)
    created_at = db.Column(db.String(30), nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.String(30), nullable=False, default=datetime.utcnow)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True)
    timezone = db.Column(db.String(50), nullable=False)
    access_token = db.Column(db.Text, nullable=False)
    stripe_customer_id = db.Column(db.String(25), nullable=True)
    created_at = db.Column(db.String(30), nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.String(30), nullable=False, default=datetime.utcnow)
    availability = db.relationship("Availability", backref="user")
    meetings = db.relationship("Meeting", backref="user")