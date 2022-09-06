import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { AwardService } from "../services/awardService";

const awardRouter = Router();
// 로그인 체크 여부 확인(postman 사용할 때는 있으면 로그인이 필요합니다 뜸)
awardRouter.use(loginRequired);

awardRouter.post("/award/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    // const userId = req.body.userId;
    // const title = req.body.title;
    // const description = req.body.description;
    const {userId, title, description} = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newAward = await AwardService.addAward({
      userId: userId,
      title: title,
      description: description
    });
    
    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
  }
    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/award/:id", async function (req, res, next) {
    try {
      // req (request) 에서 id 가져오기
      const awardId = req.params.id;
  
      // 위 id를 이용하여 db에서 데이터 찾기
      const award = await AwardService.getAward({ awardId });
  
      if (award.errorMessage) {
        throw new Error(award.errorMessage);
      }
  
      res.status(200).send(award);
    } catch (error) {
      next(error);
    }
  });

  awardRouter.get("/awardlist/:userId", async function (req, res, next) {
      try {
          const userId = req.params.userId;
          const awardList = await AwardService.getAwardList({ userId });
          res.status(200).send(awardList);
      } catch(error){
          next(error);
      }
  });

  awardRouter.put("/award/:id", async function (req, res, next) {
      try{
          const awardId = req.params.id;

          const title = req.body.title ?? null; // ??는 왼쪽 피연산자가 null 또는 undefined일 때 오른쪽 피연산자 반환 그렇지 않으면 왼쪽 피연산자 반환
          const description = req.body.description ?? null;

          const toUpdate = { title, description };

          const award = await AwardService.setAward({ awardId, toUpdate });

          if (award.errorMessage) {
              throw new Error(award.errorMessage);
          }
          res.status(200).send(award);
      } catch(error) {
          next(error);
      }
  });

  awardRouter.delete("/award/:id", async function (req, res, next) {
    try {
      // req (request) 에서 id 가져오기
      const awardId = req.params.id;
  
      // 위 id를 이용하여 db에서 데이터 삭제하기
      const result = await AwardService.deleteAward({ awardId });
  
      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }
  
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  });

  // awardRouter.delete("/awards/:userId", async function (req, res, next) {
  //   try {
  //     // req (request) 에서 id 가져오기
  //     const userId = req.params.userId;
  
  //     // 위 id를 이용하여 db에서 데이터 삭제하기
  //     const result = await AwardService.deleteAllAward({ userId });
  
  //     if (result.errorMessage) {
  //       throw new Error(result.errorMessage);
  //     }
  
  //     res.status(200).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // });


export { awardRouter }
