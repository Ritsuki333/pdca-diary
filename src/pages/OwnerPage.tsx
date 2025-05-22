import { useState, useEffect, useMemo } from "react";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import { useNavigate } from "react-router-dom";


const OwnerPage = () => {
    const [newName, setNewName] = useState<string>("")
    const [newId, setNewId] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [newRole, setNewRole] = useState<string>("ユーザー")
    const [accounts, setAccounts] = useState<AccountType[]>([]);
    

    type AccountType = {
        name: string;
        email: string;
        password: string;
        role: "ユーザー" | "管理者" | "オーナー";
        active: boolean;
      };

      const navigate = useNavigate();

      const hasOwner = useMemo(() => {
        return accounts.some((acc) => acc.role === "オーナー");
      }, [accounts]);
      
      


      useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const userRole = localStorage.getItem("userRole");
      
        // ローカルストレージ上のオーナーの存在確認（初回ロード専用）
        const savedAccounts = JSON.parse(localStorage.getItem("accounts") || "[]");
        const ownerExists = savedAccounts.some((acc: AccountType) => acc.role === "オーナー");
      
        if (!ownerExists) return;
      
        if (isLoggedIn !== "true" || userRole !== "オーナー") {
          navigate("/");
        }
      }, []);


    // ローカルストレージからデータを取得
    useEffect(() => {
        const saved = localStorage.getItem("accounts");
        if (saved) {
          const parsed = JSON.parse(saved);
          const adjusted: AccountType[] = parsed.map((account: any) => ({
            name: account.name,
            email: account.email,
            password: account.password,
            role: account.role,
            active: account.active,
          }));
          setAccounts(adjusted);
        }
      }, []);


      // アカウント削除処理
    const handleDeleteAccount = (index: number) => {

        if (accounts[index].role === "オーナー") {
            alert("オーナーアカウントは削除できません");
            return;
          }

        const confirmDelete = window.confirm("本当にこのアカウントを削除してもよろしいですか？");
        if (!confirmDelete) return;
  
        const updated = [...accounts];
        updated.splice(index, 1); // indexの要素を削除
        setAccounts(updated);
        localStorage.setItem("accounts", JSON.stringify(updated));
        alert("アカウントを削除しました！");
    };

      // パスワードを初期化 
      const handleResetPassword = (index: number) => {
        const confirmReset = window.confirm("このアカウントのパスワードを初期化しますか？");
        if (!confirmReset) return;
      
        const updated = [...accounts];
        updated[index].password = "initial123!";
        setAccounts(updated);
        localStorage.setItem("accounts", JSON.stringify(updated));
        alert("パスワードを初期化しました！");
      };

      const handleSaveAccounts = () => {
        localStorage.setItem("accounts", JSON.stringify(accounts));
        alert("保存しました！");
    };
          // アカウント読込 
    const handleLoadAccounts = () => {
        const saved = localStorage.getItem("accounts");
        if (saved) {
            const parsed = JSON.parse(saved);
            const adjusted: AccountType[] = parsed.map((account: any) => ({
                name: account.name,
                email: account.email,
                password: account.password,
                role: account.role === "管理者" ? "管理者" : "ユーザー",
                active: account.active,
              }));
              setAccounts(adjusted);
              alert("読込が完了しました！");
            }
          };

          // アカウント無効化
      const handleDisableAccount = (index: number) => {
        const updated = [...accounts]
        updated[index].active = false
        setAccounts(updated)
        localStorage.setItem("accounts", JSON.stringify(updated))
    }

    const handleEnableAccount = (index: number) => {
        const updated = [...accounts];
        updated[index].active = true;
        setAccounts(updated);
        localStorage.setItem("accounts", JSON.stringify(updated));
      };

      // アカウント作成
    const handleCreateAccount = () => {

        if (newRole === "オーナー" && hasOwner) {
            alert("オーナーはすでに存在しています");
            return;
          }

        if (!newName || !newId || !newPassword) {
            alert("全ての項目を入力してください")
            return
        }

        if (newId.length > 50) {
            alert("IDは50文字以内で入力してください");
            return;
          }
        
        if (newPassword.length < 8 || newPassword.length > 32) {
            alert("パスワードは8〜32文字で入力してください");
            return;
        }


    

        const newAccount: AccountType = {
            name: newName,
            email: newId,
            password: newPassword,
            role: newRole === "管理者" ? "管理者" : "ユーザー",  // 型を「管理者」か「ユーザー」に限定
            active: true,
          };

        const updatedAccounts = [...accounts, newAccount]
        setAccounts(updatedAccounts)
        localStorage.setItem("accounts", JSON.stringify(updatedAccounts))

        setNewName("")
        setNewId("")
        setNewPassword("")
        setNewRole("ユーザー")
    }







  return (

    <div className="min-h-screen bg-red-50 p-6 overflow-y-auto">
        <h1 className="text-3xl font-sans text-center text-stone-600 mb-6">アカウント作成</h1>
            <div className="justify-center items-center gap-2 sm:gap-8 bg-white p-4 rounded-xl shadow-md w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto font-sans mb-6">

                <Input
                    type="text"
                    placeholder="名前"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="mb-4 border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans"
                />
            

                <Input
                    type="text"
                    placeholder="ID"
                    value={newId}
                    onChange={(e) => setNewId(e.target.value)}
                    className="mb-4 border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans"
                />

                <Input
                    type="password"
                    placeholder="パスワード"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mb-4 border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans"
                />

                <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="mb-4 border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans"
                >
                    <option value="ユーザー">ユーザー</option>
                    <option value="管理者">管理者</option>
                    {!hasOwner && <option value="オーナー">オーナー</option>}
                </select>

                <Button
                    onClick={handleCreateAccount}
                    className="mt-4 bg-red-200 text-stone-600 px-4 py-2 rounded hover:bg-red-300 mx-auto block"
                >
                    アカウント作成
                </Button>
            </div>

        <div>
            <h2 className="text-xl font-sans text-center text-stone-600 mb-4 mt-8">アカウント一覧</h2>

            {/* 保存ボタンと読込ボタン */}
            <div className="flex justify-center items-center gap-2 sm:gap-8 bg-white p-4 rounded-xl shadow-md w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto font-sans mb-6">
                <Button
                    onClick={handleSaveAccounts}
                    className="min-w-[100px] sm:min-w-[120px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-orange-400 hover:bg-orange-500 transition">
                    保存
                </Button>

                <Button
                    onClick={handleLoadAccounts}
                    className="min-w-[100px] sm:min-w-[120px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-orange-400 hover:bg-orange-500 transition">
                    読込
                </Button>
            </div>

            {accounts.length === 0 ? (
                <p className="text-gray-500">アカウントがありません</p>
            ) : (
                accounts.map((account, index) => (
                    <div 
                    key={index}
                    className="border p-4 mb-4 rounded-xl bg-white shadow-md hover:bg-gray-50 transition"
                    >
                        <p className="text-sm text-stone-600">👤 名前: {account.name}</p>
                        <p className="text-sm text-stone-600">📧 Email: {account.email}</p>
                        <p className="text-sm text-stone-600">🔑 権限: {account.role}</p>
                        <p className={`text-sm font-semibold ${account.active ? "text-green-500" : "text-gray-400"}`}>
                            {account.active ? "✅ 状態: 有効" : "⛔ 状態: 無効"}
                            </p>

                        {/* ボタングループ */}
                        <div className="flex justify-center items-center gap-2 sm:gap-8  p-4 rounded-xl max-w-md sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto font-sans mb-6">
                            {/* アカウントが有効なら無効化ボタンを表示 */}
                            {account.active && (
                                <Button
                                    onClick={() => handleDisableAccount(index)}
                                    className="mt-2 bg-red-400 text-stone-600 px-3 py-1 rounded hover:bg-red-600">
                                        無効化
                                </Button>
                            )}    

                                {!account.active && (
                                    <Button
                                        onClick={() => handleEnableAccount(index)}
                                        className="mt-2 bg-green-400 text-stone-600 px-3 py-1 rounded hover:bg-green-500">
                                            再有効化
                                    </Button>
                                )}
                                <Button
                                    onClick={() => handleResetPassword(index)}
                                    className="mt-2 bg-gray-400 text-stone-600 px-3 py-1 rounded hover:bg-gray-500 ml-2">
                                    パスワード初期化
                                </Button>

                                <Button
                                    onClick={() => handleDeleteAccount(index)}
                                    className="mt-2 bg-red-200 text-stone-600 px-3 py-1 rounded hover:bg-red-300 ml-2">
                                    削除
                                </Button>
                        </div>

                    </div>
                ))
            )}  
        </div>

    </div>

    
    
  )
};

export default OwnerPage;
