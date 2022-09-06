import { ProjectModel } from "../schemas/project";

class Project {
    // 입력 받은 프로젝트 정보 생성
    static async create({ newProject }) {
      const createdNewProject = await ProjectModel.create(newProject);
      return createdNewProject;
    }
    
    // 프로젝트의 고유한 id로 프로젝트 검색(수정 할 때 사용)
    static async findById({ projectId }) {
      const project = await ProjectModel.findOne({ projectId });
      return project;
    }

    // 입력받은 userId의 모든 프로젝트 검색
    static async findByUserId({ userId }) {
      const projects = await ProjectModel.find({ userId });
      return projects;
    }
    
    // 입력받은 값들로 수상이력 업데이트(수정)
    static async update({ projectId, fieldToUpdate, newValue }) {
      const filter = { id: projectId };
      const update = { [fieldToUpdate]: newValue };
      const option = { returnOriginal: false };
  
      const updatedProject = await ProjectModel.findOneAndUpdate(
        filter,
        update,
        option
      );
      return updatedProject;
    }
  
    static async deleteById({ projectId }) {
      const deleteResult = await ProjectModel.deleteOne({ id: projectId });
      const isDataDeleted = deleteResult.deletedCount === 1;
      return isDataDeleted;
    }
  }
  
  export { Project };
