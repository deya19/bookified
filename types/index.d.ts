import { Document, Types } from 'mongoose';
import { ReactNode } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';
import z from 'zod';
import { UploadSchema } from '@/lib/zod';

// ============================================
// DATABASE MODELS
// ============================================

interface IBook extends Document {
    _id: string;
    clerkId: string;
    title: string;
    slug: string;
    author: string;
    persona?: string;
    fileURL: string;
    fileBlobKey: string;
    coverURL: string;
    coverBlobKey?: string;
    fileSize: number;
    totalSegments: number;
    createdAt: Date;
    updatedAt: Date;
}

interface IBookSegment extends Document {
    clerkId: string;
    bookId: Types.ObjectId;
    content: string;
    segmentIndex: number;
    pageNumber?: number;
    wordCount: number;
    createdAt: Date;
    updatedAt: Date;
}

interface IVoiceSession extends Document {
    _id: string;
    clerkId: string;
    bookId: Types.ObjectId;
    startedAt: Date;
    endedAt?: Date;
    durationSeconds: number;
    billingPeriodStart: Date;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================
// FORM & INPUT TYPES
// ============================================

type BookUploadFormValues = z.infer<typeof UploadSchema>;

interface CreateBook {
    clerkId: string;
    title: string;
    author: string;
    persona?: string;
    fileURL: string;
    fileBlobKey: string;
    coverURL?: string;
    coverBlobKey?: string;
    fileSize: number;
}

interface TextSegment {
    text: string;
    segmentIndex: number;
    pageNumber?: number;
    wordCount: number;
}

interface BookCardProps {
    title: string;
    author: string;
    coverURL: string;
    slug: string;
}

interface Messages {
    role: string;
    content: string;
}

interface ShadowBoxProps {
    children: ReactNode;
    className?: string;
}

interface VoiceSelectorProps {
    disabled?: boolean;
    className?: string;
    value?: string;
    onChange: (voiceId: string) => void;
}

interface InputFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    placeholder?: string;
    disabled?: boolean;
}

interface FileUploadFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    acceptTypes: string[];
    disabled?: boolean;
    icon: LucideIcon;
    placeholder: string;
    hint: string;
}
import {PLANS, PlanType} from "@/lib/subscription-constants";

interface SessionCheckResult {
    allowed: boolean;
    currentCount: number;
    limit: number;
    plan: PlanType;
    maxDurationMinutes: number;
    error?: string;
}

interface StartSessionResult {
    success: boolean;
    sessionId?: string;
    maxDurationMinutes?: number;
    error?: string;
    isBillingError?: boolean;
}

interface EndSessionResult {
    success: boolean;
    error?: string;
}