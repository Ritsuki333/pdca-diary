import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();


export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        res.status(400).json({ message: "全ての項目を入力してください" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
            },
        });

        res.status(201).json({ message: "ユーザー登録完了", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "登録に失敗しました" });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "IDとパスワードを入力してください" });
        return;
    }

    try {
        // ユーザーをDBから取得
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // ユーザーが存在しない or 無効ならエラー
        if (!user || !user.active) {
            res.status(401).json({ message: "IDまたはパスワードが違います" });
            return;
        }

        // パスワードが一致するかチェック
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "IDまたはパスワードが違います" });
            return;
        }

        // ログイン成功
        res.status(200).json({
            message: "ログイン成功",
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "ログインに失敗しました" });
    }
};