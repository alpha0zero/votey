import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/prismaClient";

export default async function hundler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") res.status(405).end('method not allowed')
    else {
        try{
            const vote = await prisma.vote.create(
                {data: {
                    question: req.body.question,
                    answers: {
                        create: req.body.answers
                        }
                    }, include: {
                        answers: true
                    }
                }
        
            )
            res.json({message: "poll created", vote})
        }catch(err) {
            res.json({message: "poll not created", err, vote:req.body})
        }
    }
    
}