// /schemas/SiteInfoFormSchema.js
import { z } from "zod";

// Individual step schemas
export const BusinessInfoSchema = z.object({
    Type: z.string().default("Regular Service"),
    BusinessName: z.string().min(1, "Please enter the business name of this location."),
    Address: z.string().min(1, "Please enter the number & street for this location."),
    Suburb: z.string().min(1, "Please enter the suburb for this location."),
    State: z.string()
        .min(1, "Please enter the state this is located in.")
        .refine((val) => val !== "select", "Please select a state."),
    Postcode: z.string().min(1, "Please enter the post code for this location."),
});

export const ContactInfoSchema = z.object({
    Contact: z.string().min(1, "Please enter the main contact person at this location."),
    Position: z.string().min(1, "Please enter the main contact person position or role at this location."),
    Phone: z.string().min(1, "Please enter their best contact number."),
    Email: z.string()
        .email("Please enter a valid email address.")
        .min(1, "Please enter the email address at this location."),
    Accounts: z.string()
        .email("Please enter a valid email address.")
        .min(1, "Please enter the email address to send accounts."),
});

export const ServiceInfoSchema = z.object({
    Services: z.array(z.string()).min(1, "Please select what services you require."),
    Dates: z.string().min(1, "Please enter the date you would like to commence this service."),
    Schedule: z.array(z.string()).min(1, "Please select your preferred schedule."),
    Bank: z.string().min(1, "Please enter the bank this location uses."),
});

export const RiskAssessmentSchema = z.object({
    Amount: z.enum([
        "$100 to $500",
        "$500 to $1,000",
        "$1,000 to 5,000",
        "$5,000 to $10,000",
        "$10,000 to $20,000",
        "$20,000 to $25,000",
        "$25,000 to $50,000",
        "$50,000 to $100,000",
        "$100,000+",
    ], {
        errorMap: () => ({ message: "Please select an average notes value." })
    }).refine((val) => val !== "" && val !== undefined, {
        message: "Please select an average notes value.",
    }),
    Parking: z.array(z.string()).optional(),
    Security: z.array(z.string()).optional(),
    External: z.array(z.string()).optional(),
    Internal: z.array(z.string()).optional(),
});

// Step configuration
export const SITE_INFO_STEPS = {
    BUSINESS: 'business',
    CONTACT: 'contact',
    SERVICE: 'service',
    RISK: 'risk'
};

export const STEP_SCHEMAS = {
    [SITE_INFO_STEPS.BUSINESS]: BusinessInfoSchema,
    [SITE_INFO_STEPS.CONTACT]: ContactInfoSchema,
    [SITE_INFO_STEPS.SERVICE]: ServiceInfoSchema,
    [SITE_INFO_STEPS.RISK]: RiskAssessmentSchema,
};

// Default values for the entire form
export const SITE_INFO_DEFAULT_VALUES = {
    Type: "Regular Service",
    BusinessName: "",
    Address: "",
    Suburb: "",
    State: "",
    Postcode: "",
    Contact: "",
    Position: "",
    Phone: "",
    Email: "",
    Accounts: "",
    Services: [],
    Dates: "",
    Schedule: [],
    Bank: "",
    Amount: "",
    Parking: [],
    Security: [],
    External: [],
    Internal: [],
};

// Create dynamic schema based on current step
export const createStepSchema = (currentStep) =>
{
    const baseFields = {
        Type: z.string().default("Regular Service"),
        Parking: z.array(z.string()).optional(),
        Security: z.array(z.string()).optional(),
        External: z.array(z.string()).optional(),
        Internal: z.array(z.string()).optional(),
    };

    // Define which fields are required for each step
    const stepFields = {
        0: { // Business Info
            BusinessName: z.string().min(1, "Please enter the business name of this location."),
            Address: z.string().min(1, "Please enter the number & street for this location."),
            Suburb: z.string().min(1, "Please enter the suburb for this location."),
            State: z.string()
                .min(1, "Please enter the state this is located in.")
                .refine((val) => val !== "select", "Please select a state."),
            Postcode: z.string().min(1, "Please enter the post code for this location."),
        },
        1: { // Contact Info
            Contact: z.string().min(1, "Please enter the main contact person at this location."),
            Position: z.string().min(1, "Please enter the main contact person position or role at this location."),
            Phone: z.string().min(1, "Please enter their best contact number."),
            Email: z.string()
                .email("Please enter a valid email address.")
                .min(1, "Please enter the email address at this location."),
            Accounts: z.string()
                .email("Please enter a valid email address.")
                .min(1, "Please enter the email address to send accounts."),
        },
        2: { // Service Info
            Services: z.array(z.string()).min(1, "Please select what services you require."),
            Dates: z.string().min(1, "Please enter the date you would like to commence this service."),
            Schedule: z.array(z.string()).min(1, "Please select your preferred schedule."),
            Bank: z.string().min(1, "Please enter the bank this location uses."),
        },
        3: { // Risk Assessment
            Amount: z.enum([
                "$100 to $500", "$500 to $1,000", "$1,000 to 5,000", "$5,000 to $10,000",
                "$10,000 to $20,000", "$20,000 to $25,000", "$25,000 to $50,000",
                "$50,000 to $100,000", "$100,000+",
            ], {
                errorMap: () => ({ message: "Please select an average notes value." })
            }).refine((val) => val !== "" && val !== undefined, {
                message: "Please select an average notes value.",
            }),
        }
    };

    // Add optional fields for all other steps
    Object.keys(stepFields).forEach(step =>
    {
        if (parseInt(step) !== currentStep) {
            Object.keys(stepFields[step]).forEach(field =>
            {
                if (field === 'Services' || field === 'Schedule' || field === 'Parking' || field === 'Security' || field === 'External' || field === 'Internal') {
                    baseFields[field] = z.array(z.string()).optional();
                } else {
                    baseFields[field] = z.string().optional();
                }
            });
        }
    });

    // Add required fields for current step
    const currentStepFields = stepFields[currentStep] || {};

    return z.object({ ...baseFields, ...currentStepFields });
};

// Complete form schema for final validation
export const SiteInfoCompleteSchema = z.object({
    Type: z.string().default("Regular Service"),
    BusinessName: z.string().min(1, "Please enter the business name of this location."),
    Address: z.string().min(1, "Please enter the number & street for this location."),
    Suburb: z.string().min(1, "Please enter the suburb for this location."),
    State: z.string()
        .min(1, "Please enter the state this is located in.")
        .refine((val) => val !== "select", "Please select a state."),
    Postcode: z.string().min(1, "Please enter the post code for this location."),
    Contact: z.string().min(1, "Please enter the main contact person at this location."),
    Position: z.string().min(1, "Please enter the main contact person position or role at this location."),
    Phone: z.string().min(1, "Please enter their best contact number."),
    Email: z.string()
        .email("Please enter a valid email address.")
        .min(1, "Please enter the email address at this location."),
    Accounts: z.string()
        .email("Please enter a valid email address.")
        .min(1, "Please enter the email address to send accounts."),
    Services: z.array(z.string()).min(1, "Please select what services you require."),
    Dates: z.string().min(1, "Please enter the date you would like to commence this service."),
    Schedule: z.array(z.string()).min(1, "Please select your preferred schedule."),
    Bank: z.string().min(1, "Please enter the bank this location uses."),
    Amount: z.enum([
        "$100 to $500", "$500 to $1,000", "$1,000 to 5,000", "$5,000 to $10,000",
        "$10,000 to $20,000", "$20,000 to $25,000", "$25,000 to $50,000",
        "$50,000 to $100,000", "$100,000+",
    ], {
        errorMap: () => ({ message: "Please select an average notes value." })
    }),
    Parking: z.array(z.string()).optional(),
    Security: z.array(z.string()).optional(),
    External: z.array(z.string()).optional(),
    Internal: z.array(z.string()).optional(),
});

export default SiteInfoCompleteSchema;