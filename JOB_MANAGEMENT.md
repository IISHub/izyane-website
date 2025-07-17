# Job Management Guide for iZyane Website

## Overview
Since the website doesn't have a CMS or backend, here are practical solutions for managing job postings:

## Option 1: JSON File Management (Current Implementation)
**Best for:** Small teams, infrequent updates

### How to add a new job:
1. Open `client/public/data/jobs.json`
2. Add a new job object to the array:
```json
{
  "id": "new-job-id",
  "title": "Job Title",
  "type": "Full-time",
  "typeColor": "primary-custom",
  "description": "Job description...",
  "skills": ["Skill1", "Skill2", "Skill3"],
  "location": "City, State / Remote",
  "experience": "X+ years",
  "department": "Department Name"
}
```
3. Save the file - changes appear instantly on the website

### How to remove a job:
1. Open `client/public/data/jobs.json`
2. Delete the job object from the array
3. Save the file

## Option 2: GitHub-Based Management
**Best for:** Multiple team members, version control

### Setup:
1. Create a separate GitHub repository for job data
2. Update the website to fetch from GitHub's raw file API
3. Team members can submit job postings via Pull Requests

### Benefits:
- Version control for all changes
- Approval process via PR reviews
- Non-technical team members can use GitHub's web interface

## Option 3: Headless CMS Integration
**Best for:** Non-technical team members, frequent updates

### Recommended Services:
- **Strapi** (Open source, self-hosted)
- **Contentful** (Hosted, free tier available)
- **Sanity** (Developer-friendly)
- **Forestry** (Git-based)

### Implementation:
1. Set up chosen CMS
2. Create a "Jobs" content type with required fields
3. Update website to fetch from CMS API
4. Non-technical team members can manage jobs through CMS interface

## Option 4: Google Sheets Integration
**Best for:** Simple, collaborative editing

### Setup:
1. Create a Google Sheet with job data
2. Make sheet publicly readable
3. Use Google Sheets API or export as CSV
4. Update website to fetch from Google Sheets

## Option 5: Form-Based Submission
**Best for:** Decentralized job posting

### Implementation:
1. Create a job submission form
2. Use services like Netlify Forms, Formspree, or Google Forms
3. Automatically create GitHub PRs from form submissions
4. Review and merge PRs to publish jobs

## Current Implementation Details

### File Location:
- Job data: `client/public/data/jobs.json`
- Careers page: `client/src/pages/careers.tsx`

### Job Object Structure:
```typescript
interface Job {
  id: string;           // Unique identifier
  title: string;        // Job title
  type: string;         // Full-time, Part-time, Contract
  typeColor: string;    // CSS color class
  description: string;  // Job description
  skills: string[];     // Required skills array
  location: string;     // Job location
  experience: string;   // Experience requirement
  department: string;   // Department name
}
```

### TypeColor Options:
- `primary-custom` (blue)
- `accent-custom` (green)
- `emerald-700` (emerald)
- `blue-600` (blue)
- `purple-600` (purple)
- `indigo-600` (indigo)

## Quick Start: Adding Your First Job

1. Open `client/public/data/jobs.json`
2. Copy an existing job object
3. Update all fields with your job information
4. Change the `id` to something unique (e.g., "backend-developer-2025")
5. Save the file

The website will automatically update and display the new job posting.