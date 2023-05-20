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
  ('Treino de Perna e Glúteo'),
  ('Treino de Inferiores - Foco no Glúteo'),
  ('Treino de Inferiores - Foco na Perna'),
  ('Treino de Superiores + Abdômen'),
  ('Treino de Abdômen'),
  ('Treino de Abdômen + Cárdio'),
  ('Treino de Cárdio'),
  ('Treino de Superiores + Abdômen e Cárdio'),
  ('Treino de Superiores + Abdômen (Focado em força)');