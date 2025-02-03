-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Posts Table
CREATE TABLE posts (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Calendar Events Table
CREATE TABLE calendar_events (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Slider Images Table
CREATE TABLE slider_images (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    position INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_position UNIQUE (position)
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE slider_images ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Posts policies
CREATE POLICY "Enable read access for all users" ON posts
    FOR SELECT USING (true);

CREATE POLICY "Enable write access for authenticated users only" ON posts
    FOR ALL USING (auth.role() = 'authenticated');

-- Calendar events policies
CREATE POLICY "Enable read access for all users" ON calendar_events
    FOR SELECT USING (true);

CREATE POLICY "Enable write access for authenticated users only" ON calendar_events
    FOR ALL USING (auth.role() = 'authenticated');

-- Slider images policies
CREATE POLICY "Enable read access for all users" ON slider_images
    FOR SELECT USING (true);

CREATE POLICY "Enable write access for authenticated users only" ON slider_images
    FOR ALL USING (auth.role() = 'authenticated');

-- Create functions for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at
    BEFORE UPDATE ON calendar_events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_slider_images_updated_at
    BEFORE UPDATE ON slider_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
