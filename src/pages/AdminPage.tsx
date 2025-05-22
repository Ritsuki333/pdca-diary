import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";


const AdminPage = () => {

    type PdcaRecord = {
        date: string;
        plan: string;
        doText: string;
        check: string;
        action: string;
        notify: boolean;
        notifyTime?: string;
        userEmail: string;
      };

    const [records, setRecords] = useState<PdcaRecord[]>([]);
    const [selectedUser, setSelectedUser] = useState("全て");
    const [accounts, setAccounts] = useState<{ email: string }[]>([]);
    const navigate = useNavigate();

    const validEmails = accounts.map((acc) => acc.email);

    // ユーザーを取得
    const uniqueUsers = Array.from(
        new Set(
            records
              .map((r) => r.userEmail)
              .filter((email) => typeof email === "string" && email.trim() !== "" && validEmails.includes(email))
          )
        );

        useEffect(() => {
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            const userRole = localStorage.getItem("userRole");
          
            if (isLoggedIn !== "true" || userRole !== "管理者") {
              navigate("/");
            }
          }, []);


    // アカウントを取得 
    useEffect(() => {
        const savedAccounts = localStorage.getItem("accounts");
        if (savedAccounts) {
          const parsedAccounts = JSON.parse(savedAccounts);
          setAccounts(parsedAccounts);
        }
      }, []);

    // 記録を取得
    useEffect(() => {
        const saved = localStorage.getItem("pdcaRecords");
        if (saved) {
          const parsed: PdcaRecord[] = JSON.parse(saved);
          setRecords(parsed);
        }
      }, []);

      const [selectedMonth, setSelectedMonth] = useState("2025-04");

      // ユーザー選択
      const filteredRecords = records
        .filter((r) => selectedUser === "全て" || r.userEmail === selectedUser) // ユーザーで絞り込み
        .filter((r) => r.date.startsWith(selectedMonth))                         // 表示月で絞り込み
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // 日付で新→旧に並び替え


        const handleBack = () => {
            navigate("/top");
        };

        

        const handlePrevMonth = () => {
            const [year, month] = selectedMonth.split("-").map(Number);
            const prev = new Date(year, month - 1);
            const newMonth = prev.toISOString().slice(0, 7);
            setSelectedMonth(newMonth);
        };
    
        const handleNextMonth = () => {
            const [year, month] = selectedMonth.split("-").map(Number);
            const next = new Date(year, month + 1); // 「次の月」
            const newMonth = next.toISOString().slice(0, 7);
            setSelectedMonth(newMonth);
        };

        const handleLogout = () => {
            const confirmLogout = window.confirm("ログアウトしてよろしいですか？");
            if (confirmLogout) {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userEmail");
                navigate("/"); 
            }
        }

        


















    return(
      <div className="min-h-screen bg-red-50 p-6 overflow-y-auto">
        <h1 className="text-3xl font-sans text-center text-stone-600 mb-6">管理者専用</h1>
        <div className="flex justify-center items-center gap-2 sm:gap-8 bg-white p-4 rounded-xl shadow-md w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto font-sans mb-6">
            <Button
                onClick={handleBack}
                className="min-w-[100px] sm:min-w-[120px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-orange-400 hover:bg-orange-500 transition" 
                >記録ページ
            </Button>

            <Button
                onClick={handleLogout}
                className="min-w-[100px] sm:min-w-[120px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-gray-400 hover:bg-gray-500 transition"
                >ログアウト
            </Button>
        </div>



        <select
            className="mb-4 p-2 border rounded w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-600"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}>

            <option value="全て">全て</option>
            {uniqueUsers.map((email, index) => (
            <option key={index} value={email}>{email}</option>
            ))}
        </select>

        <div className="flex justify-center items-center gap-4 mb-6">
            <Button 
                className="min-w-[70px] sm:min-w-[80px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-amber-200 hover:bg-amber-300 transition"
                onClick={handlePrevMonth}>前月へ</Button>

            <span className="text-xl font-sans text-stone-600">{selectedMonth}</span>

            <Button 
                className="min-w-[70px] sm:min-w-[80px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-amber-200 hover:bg-amber-300 transition"
                onClick={handleNextMonth}>次月へ</Button>
        </div>

        <div>
            {filteredRecords.length === 0 ? (
                <p className="text-center text-stone-600 font-sans mt-6">記録はまだありません</p>
            ) : (
            filteredRecords.map((record, index) => (
                <div
                    key={index}
                    className="border p-4 mb-4 rounded-xl bg-white shadow-md hover:bg-gray-50 transition">
                        <p className="text-sm text-stone-600 font-sans mb-2">👤 ユーザー：{record.userEmail}</p>

                        <p className="text-lg font-bold text-stone-600 font-sans">📅 {record.date}</p>

                    {/* 各PDCA項目 */}
                        <p className="mt-2 font-semibold text-stone-600 font-sans">計画：</p>
                        <p className="text-sm text-stone-600 font-sans">{record.plan}</p>

                        <p className="mt-2 font-semibold text-stone-600 font-sans">実行：</p>
                        <p className="text-sm text-stone-600 font-sans">{record.doText}</p>

                        <p className="mt-2 font-semibold text-stone-600 font-sans">確認：</p>
                        <p className="text-sm text-stone-600 font-sans">{record.check}</p>

                        <p className="mt-2 font-semibold text-stone-600 font-sans">改善：</p>
                        <p className="text-sm text-stone-600 font-sans">{record.action}</p>
                    <p className={`font-semibold ${record.notify ? "text-green-500" : "text-gray-400"}`}>
                        {record.notify ? `🔔 通知: ON（${record.notifyTime}）` : "🔕 通知: OFF"}
                    </p>
                </div>
            ))
            )}
        </div>
      </div>
    )
}

export default AdminPage;



