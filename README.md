# Tạo csdl ideas_marks


CREATE TABLE ideas_marks
(
  idea_id INTEGER,
  question_id INTEGER,
  user_id INTEGER,
  point INTEGER,
  created_time INTEGER,
  updated_time INTEGER,
  CONSTRAINT constraint_name UNIQUE (idea_id, question_id, user_id)
);