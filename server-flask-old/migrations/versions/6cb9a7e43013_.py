"""empty message

Revision ID: 6cb9a7e43013
Revises: e87dd80370e2
Create Date: 2020-11-05 10:48:54.441426

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6cb9a7e43013'
down_revision = 'e87dd80370e2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('availability', schema=None) as batch_op:
        batch_op.alter_column('created_at',
               existing_type=sa.VARCHAR(length=30),
               type_=sa.DateTime(),
               existing_nullable=False)
        batch_op.alter_column('updated_at',
               existing_type=sa.VARCHAR(length=30),
               type_=sa.DateTime(),
               existing_nullable=False)

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('created_at',
               existing_type=sa.VARCHAR(length=30),
               type_=sa.DateTime(),
               existing_nullable=False)
        batch_op.alter_column('updated_at',
               existing_type=sa.VARCHAR(length=30),
               type_=sa.DateTime(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('updated_at',
               existing_type=sa.DateTime(),
               type_=sa.VARCHAR(length=30),
               existing_nullable=False)
        batch_op.alter_column('created_at',
               existing_type=sa.DateTime(),
               type_=sa.VARCHAR(length=30),
               existing_nullable=False)

    with op.batch_alter_table('availability', schema=None) as batch_op:
        batch_op.alter_column('updated_at',
               existing_type=sa.DateTime(),
               type_=sa.VARCHAR(length=30),
               existing_nullable=False)
        batch_op.alter_column('created_at',
               existing_type=sa.DateTime(),
               type_=sa.VARCHAR(length=30),
               existing_nullable=False)

    # ### end Alembic commands ###