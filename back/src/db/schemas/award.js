import { Schema, model } from "mongoose";

const awardSchema = new Schema(
  {
    // award의 고유 id
    id: {
        type: String,
        required: true,
    },
    // 사용자 id
    userId: {
      type: String,
      required: true,
    },

    // 상 이름
    title: {
      type: String,
      required: true,
    },
    // 상 내용
    description: {
      type: String,
      required: true,
    },
    // // 수여기관
    // awardedBy: {
    //   type: String,
    //   required: true,
    // },
    // // 수여일
    // awardedDate: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const AwardModel = model("Award", awardSchema);

export { AwardModel };
