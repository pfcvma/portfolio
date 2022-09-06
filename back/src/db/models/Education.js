import { EducationModel } from "../schemas/education";

class Education {
   // 입력 받은 education 정보를 생성 
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }
  static async findById({ educationId }) {
    // 입력 받은 userId를 기준으로 db에서 하나만 검색하여 추출
    const education = await EducationModel.findOne({ id: educationId });
    return education;
  }
  static async findByUserId({ userId }) {
   // 입력 받은 userId를 기준으로 db에서 해당하는 모든 데이터를 검색하여 추출
    const educations = await EducationModel.find({ userId });
    return educations;
  }
   // 입력 받은 userId를 기준으로 데이터를 찾고 업데이트
  static async update({ educationId, fieldToUpdate, newValue }) {
    // ServiceLayer에서 전달받은 인자들을 findOneAndUpdate 를 통해 리턴해줌.
    const filter = { id: educationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  static async deleteById({ educationId }) {
    const deleteResult = await EducationModel.deleteOne({ id: educationId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }

}

export { Education };
