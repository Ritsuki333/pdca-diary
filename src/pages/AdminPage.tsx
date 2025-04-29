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

    // ユーザーを取得
    const uniqueUsers = Array.from(new Set(records.map(r => r.userEmail).filter(Boolean)));

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

        const navigate = useNavigate();

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
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">管理者専用ページ</h1>
        <div className="mb-4 flex justify-center gap-4">
            <Button
                onClick={handleBack}
                className="mb-4 bg-gray-300 text-gray-800 hover:bg-gray-400 transition px-4 py-2 rounded" 
                >← トップページへ戻る
            </Button>

            <Button
                onClick={handleLogout}
                className="mb-4 bg-red-500 text-white hover:bg-red-600 transition px-4 py-2 rounded"
                >ログアウト
            </Button>
        </div>



        <select
            className="mb-4 p-2 border rounded"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}>

            <option value="全て">全て</option>
            {uniqueUsers.map((email, index) => (
            <option key={index} value={email}>{email}</option>
            ))}
        </select>

        <div className="flex justify-center items-center gap-4 mb-6">
            <Button onClick={handlePrevMonth}>前月</Button>

            <span className="text-xl font-semibold">{selectedMonth}</span>

            <Button onClick={handleNextMonth}>次月</Button>
        </div>

        <div>
            {filteredRecords.length === 0 ? (
                <p className="text-center text-gray-500 mt-6">記録はまだありません</p>
            ) : (
            filteredRecords.map((record, index) => (
                <div
                    key={index}
                    className="border p-4 mb-4 rounded-xl bg-white shadow-md hover:bg-gray-50 transition">
                        <p className="text-sm text-gray-500 mb-2">👤 ユーザー：{record.userEmail}</p>

                        <p className="text-lg font-bold text-green-700">📅 {record.date}</p>

                    {/* 各PDCA項目 */}
                        <p className="mt-2 font-semibold text-gray-800">計画：</p>
                        <p className="text-sm text-gray-700">{record.plan}</p>

                        <p className="mt-2 font-semibold text-gray-800">実行：</p>
                        <p className="text-sm text-gray-700">{record.doText}</p>

                        <p className="mt-2 font-semibold text-gray-800">確認：</p>
                        <p className="text-sm text-gray-700">{record.check}</p>

                        <p className="mt-2 font-semibold text-gray-800">改善：</p>
                        <p className="text-sm text-gray-700">{record.action}</p>
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



