var Schema = {
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    email: {type: 'string', maxlength: 254, nullable: false, unique: true},
    name: {type: 'string', maxlength: 150, nullable: false}
  },
  classrooms: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 150, nullable: false}
  },
  notes: {
    id: {type: 'increments', nullable: false, primary: true},
    user_id: {type: 'integer', nullable: false, unsigned: true},
    classroom_id: {type: 'integer', nullable: false, unsigned: true},
    attachment: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  tags: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 150, nullable: false}
  },
  notes_tags: {
    id: {type: 'increments', nullable: false, primary: true},
    note_id: {type: 'integer', nullable: false, unsigned: true},
    tag_id: {type: 'integer', nullable: false, unsigned: true}
  },
  classrooms_users: {
    id: {type: 'increments', nullable: false, primary: true},
    user_id: {type: 'integer', nullable: false, unsigned: true},
    classroom_id: {type: 'integer', nullable: false, unsigned: true}
  }
}

module.exports = Schema
