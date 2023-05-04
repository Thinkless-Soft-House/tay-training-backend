truncate training_sheets cascade;
truncate training_days cascade;
truncate exercises cascade;
truncate methods cascade;
truncate exercise_group_categories cascade;
truncate exercise_groups cascade;
truncate exercise_methods cascade;
truncate exercise_configurations cascade;

INSERT INTO public.exercise_group_categories
  (name)
VALUES
  ('Biceps'),
  ('Triceps'),
  ('Perna'),
  ('Peito'),
  ('Ombro'),
  ('Cardio'),
  ('Dorsal');