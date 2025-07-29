import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import {UserPrefs} from "@/store/Auth"

export async function POST(request: NextRequest) {
    try {
        const {questionId, answer, authorId} = await request.json()

        const response = await databases.createDocument(db, answerCollection, ID.unique(), {
            content: answer,
            authorId: authorId,
            questionId: questionId
        })

        //increase author reputation
        const prefs = await users.getPrefs<UserPrefs>(authorId)

        await users.updatePrefs(authorId, {
            reputation: Number(prefs.reputation) + 1
        })

        return NextResponse.json(response, {status: 201})
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error?.message || "Error creating answer"
            },
            {
                status: error?.status || error?.code || 500
            }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const {answerId} = await request.json()         //get the answer ID from frontend

        const answer = await databases.getDocument(db, answerCollection, answerId)      //find the answer document with that answer ID

        const response = await databases.deleteDocument(db, answerCollection, answerId)     //remove the answer

        //decrease the reputation
        

    } catch (error: any) {
        return NextResponse.json(
            {error: error?.message || "Error deleting answer"},
            {status: error?.status || error?.code || 500}
        )
    }
}