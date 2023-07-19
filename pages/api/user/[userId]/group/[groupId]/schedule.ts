import { PrismaClient } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { addMinutes, differenceInMinutes } from "date-fns";
import { map } from "lodash-es";
import { NextApiRequest, NextApiResponse } from "next";
import { parseRecurringSchedule } from "server/utils/scheduleHelper";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  const groupId = req.query.groupId as string;

  if (req.method === "GET") {
    try {
      const targetGruop = await client.group.findUnique({
        where: {
          id: groupId,
        },
      });

      // targetGroup이 없다면 return 한다.
      if (targetGruop === null) {
        return res.status(404).json("해당 gruop을 찾을 수 없습니다.");
      }

      // 요청한 유저가 속한 gruop을 가져온다.
      const requestedUser = await client.userToGroup.findUnique({
        where: {
          userId,
        },
      });

      // 요청한 유저의 그룹이 아닌경우 return 한다.
      if (requestedUser?.groupId !== groupId) {
        return res.status(403).json("User Not in Requested Gruop");
      }

      const schedules = await client.schedule.findMany({
        where: {
          groupId: targetGruop.id,
        },
      });

      return res.status(200).json(schedules);
    } catch (e) {
      return res.status(404).json("Memory Not Found");
    }
  }

  if (req.method === "POST") {
    const targetGruop = await client.group.findUnique({
      where: {
        id: groupId,
      },
    });

    // targetGroup이 없다면 return 한다.
    if (targetGruop === null) {
      return res.status(404).json("해당 gruop을 찾을 수 없습니다.");
    }

    // 요청한 유저가 속한 gruop을 가져온다.
    const requestedUser = await client.userToGroup.findUnique({
      where: {
        userId,
      },
    });

    // 요청한 유저의 그룹이 아닌경우 return 한다.
    if (requestedUser?.groupId !== groupId) {
      return res.status(403).json("User Not in Requested Gruop");
    }

    //
    const {
      allDay,
      content,
      endTime,
      recurring,
      recurringEndTime,
      startTime,
      title,
    } = req.body;

    const parsedRecurringSchedule = parseRecurringSchedule({
      recurring,
      recurringEndTime,
      startTime,
    });

    const diffMin = differenceInMinutes(new Date(endTime), new Date(startTime));

    let recurringScheduleId;
    if (recurring !== "none") {
      const recurringSchedule = await client.recurringSchedule.create({
        data: {},
      });
      recurringScheduleId = recurringSchedule.id;
    }

    for (const i of map(
      new Array(parsedRecurringSchedule.length),
      (_, i) => i
    )) {
      const start = parsedRecurringSchedule[i];

      await client.schedule.create({
        data: {
          title,
          startDate: start,
          endDate: addMinutes(start, diffMin),
          content,
          groupId,
          recurringScheduleId,
          isAllDay: allDay,
        },
      });
    }

    return res.status(200).json("Done");
  }

  return res.status(HttpStatusCode.MethodNotAllowed).json("Method Not Allowed");
}
