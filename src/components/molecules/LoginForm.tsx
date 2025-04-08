import { useState } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";



const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    
    
    return(
        <div>
            <h1>ログインページ</h1>
            <Label>メールアドレス</Label>
            <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <Label>パスワード</Label>
            <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <Button 
                onClick={() => alert("ログイン処理")}>
                    ログイン
            </Button>
        </div>


    )
}

export default LoginForm;