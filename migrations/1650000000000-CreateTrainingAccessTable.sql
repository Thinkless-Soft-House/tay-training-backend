-- Migration: create training_access table
CREATE TABLE IF NOT EXISTS public.training_access (
  id serial primary key,
  client_id varchar(100) NOT NULL,
  training_id varchar(200) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_training_access_created_at ON public.training_access (created_at);
