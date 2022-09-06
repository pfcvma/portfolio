import is from "@sindresorhus/is";
import {Router} from 'express';
import {loginRequired} from '../middlewares/loginRequired';
import { certificateAuthService } from "../services/certificateService";

const certificateAuthRouter = Router();

certificateAuthRouter.use(loginRequired);

// 자격증 추가 Post 요청
certificateAuthRouter.post('/certificate/create', async function(req,res,next){
    try {
        // 사용자의 새로운 자격증 등록
        if(is.emptyObject(req.body)){
            throw new Error(
                `headers의 Content-Type을 application/json으로 설정해주세요`
            );

        }
        /// req에서 데이터 가져오기
        // const userId = req.body.userId;
        // const title = req.body.title;
        // const description = req.body.description;
        // const whenDate = req.body.whenDate;
        const { userId, title, description, whenDate } = req.body;

        // 위 데이터를 자격증 db에 추가하기
        const newCertificate = await certificateAuthService.addCertificate({
            userId : userId,
            title : title,
            description : description,
            whenDate : whenDate,
        });
        
        if (newCertificate.errorMessage) {
            throw new Error(newCertificate.errorMessage);
        }
        res.status(201).json(newCertificate);
        
    }
    catch(error) {
        next(error);
    }
});

// 사용자가 가지고 있는 자격증 내용 get 요청 
certificateAuthRouter.get('/certificate/:id',async function(req, res, next){
    try{
        // 자격증 Id 기준 불러오기
        const certificateId = req.params.id;
        const currentCertificateInfo = await certificateAuthService.getCertificates({certificateId});
        res.status(200).send(currentCertificateInfo);

        if (currentCertificateInfo.errorMessage){
            throw new Error(currentCertificateInfo.errorMessage);
        }
        res.status(200).send(currentCertificateInfo);
    }catch (error){
        next(error);
    }
})

// 사용자의 자격증 수정 put 요청
certificateAuthRouter.put('/certificate/:id',
    async function (req,res,next){
        try {
            //URI로부터 사용자 id 추출
            const certificateId = req.params.id;
            // body data로부터 업데이트할 사용자 정보를 추출
            const title = req.body.title ?? null;
            const description = req.body.description ?? null;
            const whenDate = req.body.whenDate ?? null;

            const toUpdate = {title, description, whenDate};
            // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트. 업데이트 내용 없을 시 생략
            const updateCertificate = await certificateAuthService.setCertificate({certificateId,toUpdate});

            if(updateCertificate.errorMessage) {
                throw new Error(updateCertificate.errorMessage);
            }
            
            res.status(200).json(updateCertificate);
        } catch(error){
            next(error);
        }
    }
)

// 사용자가 보유한 자격증 목록 불러오기 get 요청
certificateAuthRouter.get('/certificatelist/:userId',
    async function (req,res,next){
        try{
            const userId = req.params.userId;
            const certificateList = await certificateAuthService.getCertificateList({userId});
            res.status(200).send(certificateList);
        } catch(error){
            next(error);
        }
    }
)

certificateAuthRouter.delete("/certificate/:id", async function (req, res, next) {
    try {
      // req (request) 에서 id 가져오기
      const certificateId = req.params.id;
  
      // 위 id를 이용하여 db에서 데이터 삭제하기
      const result = await certificateAuthService.deleteCertificate({ certificateId });
  
      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }
  
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  });

export {certificateAuthRouter};
