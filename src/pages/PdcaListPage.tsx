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
    const [userRole, setUserRole] = useState("");

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
        const role = localStorage.getItem("userRole");
        if (role) {
          setUserRole(role);
        }
      }, []);


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
        <div className="min-h-screen bg-orange-50 p-6 overflow-y-auto">
            <h1 className="text-3xl font-sans text-center text-stone-600 mb-6">記録一覧</h1>

            <div className="flex justify-center items-center gap-2 sm:gap-8 bg-white p-4 rounded-xl shadow-md w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto font-sans mb-6">
            <Button
                onClick={handleBackToTop}
                className="min-w-[100px] sm:min-w-[120px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-orange-400 hover:bg-orange-500 transition"
                >記録ページ
            </Button>

            {userRole === "管理者" && (
            <Button
                onClick={hanldeGoAdmin}
                className="min-w-[100px] sm:min-w-[120px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-orange-400 hover:bg-orange-500 transition"
                >管理パネル
            </Button>
            )}

            <Button
                onClick={handleLogout}
                className="min-w-[100px] sm:min-w-[120px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-gray-400 hover:bg-gray-500 transition"
                >ログアウト
            </Button>
            </div>



            <div className="flex justify-center items-center gap-4 mb-6">
            <Button 
                className="min-w-[70px] sm:min-w-[80px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-amber-200 hover:bg-amber-300 transition"
                onClick={handlePrevMonth}>前月へ
            </Button>

            <span className="text-xl text-stone-600 font-semibold">{selectedMonth}</span>

            <Button 
                className="min-w-[70px] sm:min-w-[80px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-amber-200 hover:bg-amber-300 transition"
                onClick={handleNextMonth}>次月へ
            </Button>
            </div>

            {filteredRecords.length === 0 ? (
                <p
                    className="text-center text-stone-600 font-sans mt-6"
                >まだ記録がありません</p>
            ) : (
                filteredRecords.map((record,index) => (
                    <div
                        key={index}
                        className="border p-4 mb-4 rounded-xl bg-white shadow-md hover:bg-gray-50 transition">

                    <p className="text-sm text-stone-600 font-sans">
                      <strong className="font-sans">日付：</strong>
                         {record.date}
                   </p>

             {/* Plan */}
               <p className="text-sm text-stone-600 font-sans">P:今日は何をする予定ですか？</p>
                 {editingIndex === index ? (
               <textarea
                   className="w-full h-32 sm:h-36 p-3 sm:p-4 border border-stone-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans text-sm sm:text-base transition"
                   value={editPlan}
                   onChange={(e) => setEditPlan(e.target.value)}/>

               ) : (
               <p className="text-sm text-stone-600 font-sans">{record.plan}</p>
               )}

            {/* Do */}
              <p className="text-sm text-stone-600 font-sans">D:実際にどんなことをしましたか？</p>
              {editingIndex === index ? (
              <textarea
                className="w-full h-32 sm:h-36 p-3 sm:p-4 border border-stone-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans text-sm sm:text-base transition"
            value={editDo}
            onChange={(e) => setEditDo(e.target.value)}/>
          ) : (
            <p className="text-sm text-stone-600 font-sans">{record.doText}</p>
        )}

            {/* Check */}
      <p className="text-sm text-stone-600 font-sans">C:うまくいった事、できなかったことはどんなことですか？</p>
      {editingIndex === index ? (
        <textarea
          className="w-full h-32 sm:h-36 p-3 sm:p-4 border border-stone-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans text-sm sm:text-base transition"
          value={editCheck}
          onChange={(e) => setEditCheck(e.target.value)}
        />
      ) : (
        <p className="text-sm text-stone-600 font-sans">{record.check}</p>
      )}

      {/* Action */}
      <p className="text-sm text-stone-600 font-sans">A:次はどのように実行しますか？</p>
      {editingIndex === index ? (
        <textarea
          className="w-full h-32 sm:h-36 p-3 sm:p-4 border border-stone-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans text-sm sm:text-base transition"
          value={editAction}
          onChange={(e) => setEditAction(e.target.value)}
        />
      ) : (
        <p className="text-sm text-stone-600 font-sans">{record.action}</p>
      )}

      {/* 通知 */}  
      <p
        className={`mt-2 font-sans ${
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
              className="bg-gray-400 hover:bg-gray-500 font-sans text-stone-600 px-4 py-2 rounded-xl"
              >キャンセル
            </Button>
        
            <Button
              onClick={handleSaveEdit}
              className="bg-orange-400 text-stone-600 hover:bg-orange-500 font-sans px-4 py-2 rounded-xl"
              >保存
            </Button>

          </>
        ) : (

        <div
            className="flex justify-center items-center gap-6 sm:gap-8 p-4  w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto font-sans mb-6">
          <Button
            onClick={() => handleEdit(index)}
            className="min-w-[70px] sm:min-w-[80px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-amber-200 hover:bg-amber-300 transition"
          >
            編集
          </Button>

          <Button
            onClick={() => handleDelete(index)}
            className="min-w-[70px] sm:min-w-[80px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-gray-400 hover:bg-gray-500 transition"
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

