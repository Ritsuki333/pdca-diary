import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import * as bcrypt from "bcryptjs";



const LoginForm = () => {
    const [inputId, setInputId] = useState("");
    const [password, setPassword] = useState("");
    const [idError, setIdError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
    // ログインボタンを押したら、TopPageに遷移する
    const navigate = useNavigate();
    
    // メールアドレスの有効性をチェック// IDの有効性をチェック
const isIdValid = inputId !== "" && inputId.length <= 50;

    // パスワードの有効性をチェック
    const isPasswordValid =
        password !== "" &&
        password.length >= 8 &&
        password.length <= 32;


    const isFormValid = isIdValid && isPasswordValid;

   

    



    const handleLogin = () => {
        let hasError = false;
      
        // IDエラー処理
        if (inputId === "") {
          setIdError("IDを入力してください");
          hasError = true;
        } else if (inputId.length > 50) {
          setIdError("50文字以内で入力してください");
          hasError = true;
        } else {
          setIdError("");
        }
      
        // パスワードエラー処理
        if (password === "") {
          setPasswordError("パスワードを入力してください");
          hasError = true;
        } else if (password.length < 8 || password.length > 32) {
          setPasswordError("8〜32文字のパスワードを入力してください");
          hasError = true;
        } else {
          setPasswordError("");
        }
      
        if (hasError) return;
      
        const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");


      
        const matched = accounts.find(
          (acc: any) =>
            acc.email === inputId &&
          bcrypt.compareSync(password, acc.password) &&
          acc.active
        );
      
        if (!matched) {
          alert("IDまたはパスワードが間違っているか、無効です");
          return;
        }
      
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", matched.email);
        localStorage.setItem("userRole", matched.role);
      
        if (matched.role === "管理者") {
          navigate("/admin");
        } else {
          navigate("/top");
        }
      };


    
    
    return(
        <div className="flex justify-center items-center min-h-screen bg-orange-50 px-4">
            <div className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-xl">
                {/* ログインページのタイトル */}
                <h1
                    className="text-base text-shadow-lg font-sans text-stone-600 text-center mb-6"
                >ログインページ</h1>

                <Label
                    className="text-sm text-shadow-lg font-sans text-stone-600 block mb-1"
                    >ID
                </Label>

                <Input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans"
                    type="text"
                    onChange={(e) => setInputId(e.target.value)}
                    value={inputId}
                />

                {/* エラーメッセージを表示 */}
                {idError && (
                  <p className="text-red-500 text-shadow-lg text-sm mb-2 font-sans">{idError}</p>
                )}



                <Label
                    className="text-sm text-shadow-lg font-sans text-stone-600 block mb-1"
                    >パスワード
                </Label>

            
                <Input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 mb-2 font-sans"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                {/* エラーメッセージを表示 */}
                {passwordError && (
                  <p className="text-red-500 text-shadow-lg text-sm mb-2 font-sans">{passwordError}</p>
                )}

                <Button
                    // フォームが有効ならボタンを有効にする
                    disabled={!isFormValid}
                    // フォームの状態でCSSが変わる
                    className={`w-full py-3 text-stone-600 font-sans font-semibold rounded-lg transition
                        ${isFormValid 
                        ? "bg-orange-300 hover:bg-orange-400"
                        : "bg-gray-300 cursor-not-allowed"}`}
                    onClick={handleLogin}
                    >ログイン
                </Button>
            </div>
        </div>


    )
}

export default LoginForm;