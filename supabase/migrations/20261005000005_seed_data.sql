-- ==============================================================================
-- MEZDOHUB MIGRATION 005: SEED TAXONOMY & DEVELOPMENT BENCHMARKS
-- Version: 1.0.0
-- Dependencies: Migrations 001, 002, 003, 004
-- ==============================================================================

BEGIN;

-- 1. Deterministic System UUIDs for Test Seeding
-- Admin User: 00000000-0000-0000-0000-000000000001
-- Employer User (Renault): 00000000-0000-0000-0000-000000000002
-- Candidate User (OFPPT Tech): 00000000-0000-0000-0000-000000000003

-- 2. Seed Base Profiles (Assumes corresponding auth.users exist or created in dev sandbox)
-- In production Supabase, profiles are populated via trigger on auth.users.
-- For direct schema testing, we insert dummy records:
INSERT INTO public.profiles (id, email, role, full_name, phone, city, email_verified, is_active)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'admin@mezdohub.ma', 'admin', 'المدير التقني والعمليات (MezdoHub Admin)', '+212661000000', 'طنجة', true, true),
    ('b0000000-0000-0000-0000-000000000002', 'employer@renault-tanger.ma', 'employer', 'أحمد العمراني (HR Manager)', '+212539123456', 'طنجة - ملوسة', true, true),
    ('c0000000-0000-0000-0000-000000000003', 'candidate@mezdohub.ma', 'candidate', 'ياسين الفاسي (تقني كهروميكانيك)', '+212654321987', 'طنجة', true, true)
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name;

-- 3. Seed Candidate Profile
INSERT INTO public.candidates (
    profile_id, education_level, specialization, institution, graduation_year, 
    years_experience, languages, target_sectors, actively_seeking, allow_employer_contact
)
VALUES (
    'c0000000-0000-0000-0000-000000000003',
    'technicien_specialise_ista',
    'Electromécanique des Systèmes Automatisés (ESA)',
    'ISTA Ibn Marhoum Tanger',
    2025,
    1,
    '{"ar": "native", "fr": "technique", "en": "basic"}'::JSONB,
    ARRAY['automotive', 'aeronautics', 'cabling'],
    true,
    true
)
ON CONFLICT (profile_id) DO NOTHING;

-- 4. Seed Primary Resume
INSERT INTO public.resumes (
    id, candidate_id, title, file_storage_path, file_size_bytes, mime_type, is_primary, parsed_skills
)
VALUES (
    'd0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000003',
    'CV_Yassine_Fassi_Technicien_2026.pdf',
    'resumes/c0000000-0000-0000-0000-000000000003/cv_ats_primary.pdf',
    145000,
    'application/pdf',
    true,
    ARRAY['Automates Programmables (Siemens)', 'Câblage Industriel', 'Maintenance Préventive', 'Habilitation Electrique']
)
ON CONFLICT (id) DO NOTHING;

-- 5. Seed Verified Tangier Employers (Renault, Lear, Teleperformance)
INSERT INTO public.companies (
    id, primary_owner_id, name, legal_ice, commercial_register_rc, tax_id_if, 
    industry_sector, industrial_zone, city, website_url, company_size, is_verified, verified_at
)
VALUES 
    (
        'e0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000002',
        'Renault Group Tangier Med',
        '001524389000045',
        'RC-TGR-45120',
        'IF-3419082',
        'صناعة السيارات وتجميع المركبات (Automotive Manufacturing)',
        'Melloussa Tangier Automotive City',
        'طنجة',
        'https://www.renaultgroup.com',
        '5000+',
        true,
        NOW()
    ),
    (
        'e0000000-0000-0000-0000-000000000002',
        'b0000000-0000-0000-0000-000000000002',
        'Lear Corporation Automotive Electrical Tanger',
        '001894231000088',
        'RC-TGR-32091',
        'IF-1982730',
        'الأنظمة الكهربائية وتوزيع الكابلات (Cabling Systems)',
        'TFZ - Tangier Free Zone',
        'طنجة',
        'https://www.lear.com',
        '1000-5000',
        true,
        NOW()
    )
ON CONFLICT (id) DO NOTHING;

-- 6. Seed Tangier Industrial Jobs
INSERT INTO public.jobs (
    id, company_id, created_by, title, slug, category, contract_type, min_education, 
    experience_required_years, city, workplace_location, min_salary_mad, max_salary_mad, 
    is_salary_disclosed, description, key_requirements, benefits, direct_hr_email, 
    status, is_featured, published_at, expires_at
)
VALUES 
    (
        'f0000000-0000-0000-0000-000000000001',
        'e0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000002',
        'تقني صيانة المعدات الآلية وروبوتات اللحام (Robotics Maintenance Technician)',
        'technicien-maintenance-robotique-renault-tanger-melloussa',
        'صيانة صناعية وكهروميكانيك',
        'cdi',
        'technicien_specialise_ista',
        1,
        'طنجة',
        'مصنع ملوسة طنجة - Melloussa Plant',
        5200,
        6800,
        true,
        'نبحث عن تقنيين متخصصين من خريجي معاهد التكوين المهني لضمان الصيانة الوقائية والتصحيحية لخطوط الإنتاج الآلية وروبوتات التجميع.',
        ARRAY['دبلوم تقني متخصص كهروميكانيك أو صيانة صناعية', 'معرفة ببرمجة Automates Siemens S7', 'جاهزية لنظام العمل بالتناوب 3x8', 'الانضباط التام لمعايير السلامة الصناعية'],
        ARRAY['النقل مجاني لجميع مناطق طنجة وتطوان', 'تأمين صحي تكميلي CNSS + CIMR', 'وجبة غذاء بالمطعم الداخلي للمصنع', 'منحة المردودية السنوية'],
        'recrutement.tanger@renault.com',
        'published',
        true,
        NOW(),
        NOW() + INTERVAL '60 days'
    ),
    (
        'f0000000-0000-0000-0000-000000000002',
        'e0000000-0000-0000-0000-000000000002',
        'b0000000-0000-0000-0000-000000000002',
        'مراقب جودة التوصيلات والضفائر الكهربائية (Quality Control Cable Inspector)',
        'controleur-qualite-cablage-lear-tfz-tanger',
        'مراقبة الجودة والتصنيع',
        'cdi',
        'technicien_ita',
        0,
        'طنجة',
        'المنطقة الحرة للتصدير TFZ طنجة',
        3800,
        4500,
        true,
        'مراقبة الجودة البصرية والكهربائية لحزم الكابلات الموجهة لكبار مصنعي السيارات الأوروبية.',
        ARRAY['دبلوم تقني في الكهرباء أو الكابلاج', 'حدة بصرية ممتازة وقدرة على تمييز ألوان الأسلاك', 'تحمل وتيرة العمل الصناعي'],
        ARRAY['نقل مستخدمين مؤمن', 'منح إنتاجية شهرية', 'فرص ترقية لـ Chef de ligne'],
        'jobs-morocco@lear.com',
        'published',
        false,
        NOW(),
        NOW() + INTERVAL '45 days'
    )
ON CONFLICT (id) DO NOTHING;

-- 7. Seed Sample Application & Notification
INSERT INTO public.applications (
    id, job_id, candidate_id, resume_id, package_type, status, cover_letter, internal_notes
)
VALUES (
    'a1000000-0000-0000-0000-000000000001',
    'f0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000003',
    'd0000000-0000-0000-0000-000000000001',
    'full_dossier_service',
    'dossier_in_review',
    'أتشرف بتقديم ترشيحي لشغل منصب تقني صيانة برينو طنجة، حيث تدربت على أنظمة الأتمتة الصناعية في المعهد المتخصص للتكنولوجيا التطبيقية.',
    'ملف متكامل ومطابق، مؤهل لمقابلة الاختبار التقني.'
)
ON CONFLICT (job_id, candidate_id) DO NOTHING;

INSERT INTO public.notifications (
    recipient_id, type, title, body, action_url, is_read
)
VALUES (
    'c0000000-0000-0000-0000-000000000003',
    'application_status_changed',
    'تحديث حالة ملف ترشيحك لدى Renault Group 🚗',
    'تمت مراجعة ملفك التقني من طرف المشرف وتم تحويله لمرحلة الفحص الأولي (Dossier in Review).',
    '/applications/a1000000-0000-0000-0000-000000000001',
    false
)
ON CONFLICT (id) DO NOTHING;

COMMIT;
