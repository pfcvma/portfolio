import is from "@sindresorhus/is";
import { Router } from "express";
import { SkillService } from "../services/skillService";
import { loginRequired } from "../middlewares/loginRequired";
const skillRouter = Router();
// register

skillRouter.use(loginRequired);

skillRouter.post("/skill/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요",
        "혹은 내용이 비어있습니다."
      )
    }
    const { userId} = req.body;
    const {portfolioOwner} = req.body
    const career = req.body.career ?? null;
    const languageList = req.body.languageList ?? null;
    const newSkill = await SkillService.addSkill({
      userId,
      career,
      languageList,
      portfolioOwner
    });
    if (newSkill.errorMessage) {
      throw new Error(newSkill.errorMessage)
    }
    res.status(201).json(newSkill);
  } catch (e) {
    next(e)
  }
})

skillRouter.get("/skill/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const skillId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 찾기
    const skill = await SkillService.getSkill({ skillId });

    if (skill.errorMessage) {
      throw new Error(skill.errorMessage);
    }

    res.status(200).send(skill);
  } catch (error) {
    next(error);
  }
});

skillRouter.get("/skillList/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId
    const skilllist = await SkillService.getSkilllist({ userId });
    res.status(200).send(skilllist);
  } catch (error) {
    next(error);
  }
});

skillRouter.get("/skillListBySearch/:career/:languageList", async function (req, res, next) {
  try {
    const careerSearch = req.params.career  ;
    const languageSerach = req.params.languageList ;
    const skillListBySearch = await SkillService.getSkillListBySearch({careerSearch, languageSerach});
    res.status(200).send(skillListBySearch);
  } catch (error) {
    next(error);
  }
});

skillRouter.put("/skill/:id", async function (req, res, next) {
  try {
    const skillId = req.params.id;
    const career = req.body.career ?? null;
    const languageList = req.body.languageList ?? null;

    const toUpdate = { career, languageList };

    const skill = await SkillService.setSkill({ skillId, toUpdate }); // 업데이트 할 목록을 toUpdate 변수에 담아 ServiceLayer 의 setEducation에 전달

    if (skill.errorMessage) {
      throw new Error(skill.errorMessage);
    }
    res.status(200).send(skill);
  } catch (error) {
    next(error);
  }
});
skillRouter.delete("/skill/:userId", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const userId = req.params.userId;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await SkillService.deleteSkill({ userId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result, "삭제가 완료 되었습니다.");
  } catch (error) {
    next(error);
  }
});





export { skillRouter }