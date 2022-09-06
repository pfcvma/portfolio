import { AwardModel } from "../schemas/award";

class Award {
    // 입력 받은 수상 정보 생성
    static async create({ newAward }) {
      const createdNewAward = await AwardModel.create(newAward);
      return createdNewAward;
    }
    
    // 수상이력의 고유한 id로 수상이력 검색(수정 할 때 사용)
    static async findById({ awardId }) {
      const award = await AwardModel.findOne({ id: awardId });
      return award;
    }

    // 입력받은 userId의 모든 수상이력 검색
    static async findByUserId({ userId }) {
      const awards = await AwardModel.find({ userId });
      return awards;
    }
    
    // 입력받은 값들로 수상이력 업데이트(수정)
    static async update({ awardId, fieldToUpdate, newValue }) {
      const filter = { id: awardId };
      const update = { [fieldToUpdate]: newValue };
      const option = { returnOriginal: false };
  
      const updatedAward = await AwardModel.findOneAndUpdate(
        filter,
        update,
        option
      );
      return updatedAward;
    }
  
    static async deleteById({ awardId }) {
      const deleteResult = await AwardModel.deleteOne({ id: awardId });
      const isDataDeleted = deleteResult.deletedCount === 1;
      return isDataDeleted;
    }

    // static async deleteAll({ userId }) {
    //   const deleteAllResult = await AwardModel.deleteMany({ userId });
    //   const isAllDataDeleted = deleteAllResult.deletedCount === 1; 
    //   return isAllDataDeleted;
    // }
  }
  
  export { Award };
