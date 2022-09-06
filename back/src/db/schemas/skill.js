import { Schema, model } from "mongoose";

const SkillSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        career: {
            type: String,
            required: false,
        },
        languageList: {
            type: Array,
            required: false,
        },
        portfolioOwner: {
            type: Object,
            required: false
        }
    },
    {
        timestamps: true,
    }
);

const SkillModel = model("skill", SkillSchema);

export { SkillModel };
