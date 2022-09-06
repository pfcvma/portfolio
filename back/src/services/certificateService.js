import {Certificate} from '../db';
import {v4 as uuidv4} from 'uuid';

class certificateAuthService {
    // 자격증 추가
    static async addCertificate({userId, title, description,whenDate}){
        // 자격증 id의 유니크 값
        const id = uuidv4();
        const newCertificate = {id, userId, title, description, whenDate};
        
        const createdNewCertificate = await Certificate.create({newCertificate});
        createdNewCertificate.errorMessage=null;
        return createdNewCertificate;
    }

    // 자격증 내용 불러오기
    static async getCertificates({certificateId}){
        const certificates = await Certificate.findById({certificateId})
        if (!certificates){
            const errorMessage = "해당 id를 가진 자격증은 없습니다. 다시 한 번 확인해주세요.";
            return { errorMessage }
        }
        return certificates
      }
    

    // 자격증 내용 수정
    static async setCertificate({certificateId,toUpdate}){
        let certificate = await Certificate.findById({certificateId});
        // 자격증 보유 확인
        if (!certificate) {
            const errorMessage = `해당 id를 가진 자격증 이력은 없습니다. 다시 한 번 확인해주세요.`;
            return {errorMessage};
        }
        // 자격증 이름 수정
        if(toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            certificate = await Certificate.update({certificateId,fieldToUpdate,newValue});
        }
        // 자격증 내용 수정
        if(toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            certificate = await Certificate.update({certificateId,fieldToUpdate,newValue});
        }
        // 자격증 날짜 수정
        if (toUpdate.whenDate) {
            const fieldToUpdate = "whenDate";
            const newValue = toUpdate.whenDate;
            certificate = await Certificate.update({certificateId,fieldToUpdate,newValue});
        }
        return certificate;
    }

    // 보유한 자격증 목록 불러오기
    static async getCertificateList({userId}){
        const certificates = await Certificate.findByUserId({userId});
        return certificates;
    }

    static async deleteCertificate({ certificateId }) {
        const isDataDeleted = await Certificate.deleteById({ certificateId });
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!isDataDeleted) {
          const errorMessage =
            "해당 id를 가진 자격증은 없습니다. 다시 한 번 확인해 주세요.";
          return { errorMessage };
        }
    
        return { status: "ok" };
      }
}
export {certificateAuthService};
