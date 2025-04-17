import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";



const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
    // ログインボタンを押したら、TopPageに遷移する
    const navigate = useNavigate();
    
    // メールアドレスの有効性をチェック
    const isEmailValid = 
        email !== "" &&
        email.includes("@") &&
        email.length <= 255;

    // パスワードの有効性をチェック
    const isPasswordValid =
        password !== "" &&
        password.length >= 8 &&
        password.length <= 32;


    const isFormValid = isEmailValid && isPasswordValid;

   

    



    const handleLogin = () => {
        let hasError = false;


        if (email ==="") {
            setEmailError("メールアドレスを入力してください");
            hasError = true;
        } else if (!email.includes("@") || email.length > 255){
            setEmailError("有効なメールアドレス形式で入力して下さい");
            hasError = true;
        } else {
            setEmailError("");
        }

        if (password === "") {
            setPasswordError("パスワードを入力してください");
            hasError = true;
        } else if (password.length < 8 || password.length > 32) {
            setPasswordError("8〜32文字のパスワードを入力してください");
            hasError = true;
        } else {
            setPasswordError("");
        }

        if (!hasError) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", email);
            navigate("/top");
        }
    }


    
    
    return(
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                {/* ログインページのタイトル */}
                <h1
                    className="text-sm font-medium text-gray-700 block mb-1 text-center w-full"
                >ログインページ</h1>

                <Label
                    className="text-sm font-medium text-gray-700 block mb-1"
                    >メールアドレス
                </Label>

                <Input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                {/* エラーメッセージを表示 */}
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}



                <Label
                    className="text-sm font-medium text-gray-700 block mb-1"
                    >パスワード
                </Label>

            
                <Input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                {/* エラーメッセージを表示 */}
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}

                <Button
                    // フォームが有効ならボタンを有効にする
                    disabled={!isFormValid}
                    // フォームの状態でCSSが変わる
                    className={`font-semibold px-4 py-2 mt-5 rounded transition w-full
                        ${isFormValid 
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 text-white cursor-not-allowed"}`}
                    onClick={handleLogin}
                    >ログイン
                </Button>
            </div>
        </div>


    )
}

export default LoginForm;