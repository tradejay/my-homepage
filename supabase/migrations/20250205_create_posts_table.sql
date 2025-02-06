-- 20250205_create_posts_table.sql

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    category TEXT,
    date TEXT
);

-- Enable Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous access
CREATE POLICY "Allow anonymous access to posts"
    ON public.posts
    FOR SELECT
    TO anon
    USING (true);

-- Create policy to allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to manage posts"
    ON public.posts
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
