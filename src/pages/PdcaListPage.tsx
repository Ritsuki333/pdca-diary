import { useState, useEffect } from "react"
import Button from "../components/atoms/Button"
import { useNavigate } from "react-router-dom"

const PdcaListPage = () => {

    type PdcaRecord = {
        date: string;
        plan: string;
        doText: string;
        check: string;
        action: string;
        notify: boolean;
    };

    const [records, setRecords] = useState<PdcaRecord[]>([]);
    const [editPlan, setEditPlan] = useState("");
    const [editDo, setEditDo] = useState("");
    const [editCheck, setEditCheck] = useState("");
    const [editAction, setEditAction] = useState("");

    const navigate = useNavigate();

    const handleBackToTop = () => {
        navigate("/top");
    }

    const handleLogout = () => {
        const confirmLogout = window.confirm("ログアウトしてよろしいですか？");
        if (confirmLogout) {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userEmail");
            navigate("/");
        }
    }

    const hanldeGoAdmin = () => {
        navigate("/admin");
    }


    useEffect(() => {
        const saved = localStorage.getItem("pdcaRecords");
        if(saved){
            const parsed: PdcaRecord[] = JSON.parse(saved);
            setRecords(parsed);
        }
    }, []);

    const [selectedMonth, setSelectedMonth] = useState("2025-04");

    // 編集中のインデックスを記録
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    // 編集をやめて表示に戻す
    const handleCancelEdit = () => {
       setEditingIndex(null);
    };

    const filteredRecords = records.filter(record => 
        record.date.startsWith(selectedMonth)
    );

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

    const handleEdit = (index: number) => {
        const target = filteredRecords[index];
        setEditPlan(target.plan);
        setEditDo(target.doText);
        setEditCheck(target.check);
        setEditAction(target.action);
        setEditingIndex(index);
      };

      const handleSaveEdit = () => {
        if (editingIndex === null) return;
      
        const updated = [...records];
        const globalIndex = records.findIndex(
          (r) => r.date === filteredRecords[editingIndex].date
        );
      
        updated[globalIndex] = {
          ...updated[globalIndex],
          plan: editPlan,
          doText: editDo,
          check: editCheck,
          action: editAction,
        };
      
        setRecords(updated);
        localStorage.setItem("pdcaRecords", JSON.stringify(updated));
        setEditingIndex(null);
      };


      // 削除機能
      const handleDelete = (index: number) => {
        const confirmDelete = window.confirm("この記録を削除してもよろしいですか？");
        if (!confirmDelete) return;
      
        const globalIndex = records.findIndex(
          (r) => r.date === filteredRecords[index].date
        );
      
        if (globalIndex === -1) return;
      
        const updated = [...records];
        updated.splice(globalIndex, 1);
        setRecords(updated);
        localStorage.setItem("pdcaRecords", JSON.stringify(updated));
      };
    







    return(
        <div className="min-h-screen bg-green-50 p-6 overflow-y-auto">
            <h1 className="text-3xl font-bold text-center text-green-600 mb-6">PDCA一覧（確認用）</h1>

            <div className="flex gap-2">
            <Button
                onClick={handleBackToTop}
                className="mb-4 bg-gray-300 text-gray-800 hover:bg-gray-400 transition px-4 py-2 rounded"
                >← 記録ページへ戻る
            </Button>

            <Button
                onClick={hanldeGoAdmin}
                className="mb-4 bg-yellow-500 text-white hover:bg-yellow-600 transition px-4 py-2 rounded"
                >管理パネル
            </Button>

            <Button
                onClick={handleLogout}
                className="mb-4 bg-red-500 text-white hover:bg-red-600 transition px-4 py-2 rounded"
                >ログアウト
            </Button>
            </div>



            <div className="flex justify-center items-center gap-4 mb-6">
            <Button 
                onClick={handlePrevMonth}>前月
            </Button>

            <span className="text-xl font-semibold">{selectedMonth}</span>

            <Button 
                onClick={handleNextMonth}>次月
            </Button>
            </div>

            {filteredRecords.length === 0 ? (
                <p
                    className="text-center text-gray-500 mt-6"
                >まだ記録がありません</p>
            ) : (
                filteredRecords.map((record,index) => (
                    <div
                        key={index}
                        className="border p-4 mb-4 rounded-xl bg-white shadow-md hover:bg-gray-50 transition">

                    <p className="text-sm text-gray-700">
                      <strong className="font-semibold">日付：</strong>
                         {record.date}
                   </p>

             {/* Plan */}
               <p className="text-sm text-gray-700 font-semibold">計画：</p>
                 {editingIndex === index ? (
               <textarea
                   className="w-full p-2 border rounded mb-2"
                   value={editPlan}
                   onChange={(e) => setEditPlan(e.target.value)}/>

               ) : (
               <p className="text-sm text-gray-700">{record.plan}</p>
               )}

            {/* Do */}
              <p className="text-sm text-gray-700 font-semibold">実行：</p>
              {editingIndex === index ? (
              <textarea
                className="w-full p-2 border rounded mb-2"
            value={editDo}
            onChange={(e) => setEditDo(e.target.value)}/>
          ) : (
            <p className="text-sm text-gray-700">{record.doText}</p>
        )}

            {/* Check */}
      <p className="text-sm text-gray-700 font-semibold">確認：</p>
      {editingIndex === index ? (
        <textarea
          className="w-full p-2 border rounded mb-2"
          value={editCheck}
          onChange={(e) => setEditCheck(e.target.value)}
        />
      ) : (
        <p className="text-sm text-gray-700">{record.check}</p>
      )}

      {/* Action */}
      <p className="text-sm text-gray-700 font-semibold">改善：</p>
      {editingIndex === index ? (
        <textarea
          className="w-full p-2 border rounded mb-2"
          value={editAction}
          onChange={(e) => setEditAction(e.target.value)}
        />
      ) : (
        <p className="text-sm text-gray-700">{record.action}</p>
      )}

      {/* 通知 */}
      <p
        className={`mt-2 font-semibold ${
          record.notify ? "text-green-500" : "text-gray-400"
        }`}
      >
        {record.notify ? "🔔 通知: ON" : "🔕 通知: OFF"}
      </p>

      {/* ボタン類：編集中だけ表示 */}
      <div className="flex gap-4 mt-4">
        {editingIndex === index ? (
          <>
            <Button
              onClick={handleCancelEdit}
              className="bg-gray-300 hover:bg-gray-400"
              >キャンセル
            </Button>
        
            <Button
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white hover:bg-blue-600"
              >保存
            </Button>

          </>
        ) : (

        <div>
          <Button
            onClick={() => handleEdit(index)}
            className="bg-yellow-500 text-white hover:bg-yellow-600"
          >
            編集
          </Button>

          <Button
            onClick={() => handleDelete(index)}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            削除
          </Button>
        </div>

        )}
      </div>
    </div>
  ))
)}


            
        </div>
        
    )
}


export default PdcaListPage;

