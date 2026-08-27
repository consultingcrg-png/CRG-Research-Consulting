CREATE POLICY "Admins can read work images" ON storage.objects
FOR SELECT TO authenticated USING (bucket_id = 'work-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can upload work images" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'work-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update work images" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'work-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete work images" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'work-images' AND public.has_role(auth.uid(), 'admin'));