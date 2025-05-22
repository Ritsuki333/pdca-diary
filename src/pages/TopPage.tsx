import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import Label from "../components/atoms/Label";



const TopPage = () => {
    const [userEmail, setUserEmail] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [userRole, setUserRole] = useState("");
    
    const navigate = useNavigate();

    const showPdcalist = () => {
          navigate("/pdca-list");
    }

    const showAdminPage = () => {
          navigate("/admin");
    }

    const [today, setToday] = useState("");


    // 🟧ログアウトボタンを押したら、ログアウトする
    const handleLogout = () => {
        const confirmLogout = window.confirm("ログアウトしてよろしいですか？")
        
        if (confirmLogout) {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userEmail");
            navigate("/");
        }
    }

    const handleClear = () => {
          setPlan("");
          setDoText("");
          setCheck("");
          setAction("");
          setNotify(false);
    }

    const [plan, setPlan] = useState("");
    const [doText, setDoText] = useState("");
    const [check, setCheck] = useState("");
    const [action, setAction] = useState("");


    // 🟧保存ボタンを押したら、保存する
    const handleSave = () => {
        // 🟧今日の日付を取得
        const today = new Date().toISOString().split("T")[0];
        // 🟧新しいレコードを作成
        const newRecord = {
            date: today,
            plan: plan,
            doText: doText,
            check: check,
            action: action,
            notify: notify,
            notifyTime: notifyTime,
            userEmail: userEmail,
        }

        // 🟧既存のレコードを取得
        const existing = localStorage.getItem("pdcaRecords");
        const records = existing ? JSON.parse(existing) : [];
        // 🟧新しいレコードを追加
        records.push(newRecord);
        // 🟧レコードを保存
        localStorage.setItem("pdcaRecords", JSON.stringify(records));
        alert("保存しました");
        setIsSaved(true); 

        setTimeout(() => {
          setIsSaved(false);
        }, 3000);

        
    }

    const [notify, setNotify] = useState(false);

    // 🟧通知時間を設定
    const [notifyTime, setNotifyTime] = useState("07:00");

    // 保存ボタン：フォームが有効かどうかを確認
    const isFormValid = plan && doText && check && action;

    useEffect(() => {
     const email = localStorage.getItem("userEmail");
     const role = localStorage.getItem("userRole");
   
     if (email) setUserEmail(email);
     if (role) setUserRole(role);
   
     const now = new Date();
     const formatted = now.toISOString().split("T")[0];
     setToday(formatted);
   }, []);




    useEffect(() => {
        // 🟧ログインしていない場合はトップページにリダイレクト
        const isLoggedIn = localStorage.getItem("isLoggedIn");
         if (isLoggedIn !== "true") {
            navigate("/");
         }
        // 🟧ユーザーのメールアドレスを取得
        const email =localStorage.getItem("userEmail");
        if (email) {
            setUserEmail(email);
        }
    }, []);

    // 🟧本日の日付を取得
    useEffect(() => {
     const email = localStorage.getItem("userEmail");
     if (email) setUserEmail(email);
   
     const now = new Date();
     const formatted = now.toISOString().split("T")[0];
     setToday(formatted);
   }, []);
    
    
    
    return (
       <div className="min-h-screen bg-orange-50 p-6 overflow-y-auto">
           <h1 className="text-xl sm:text-2xl font-sans text-stone-600 text-center"
             >{userEmail}さん、ようこそ！
           </h1>

           <p className="text-center font-sans text-base md:text-lg text-stone-600 mt-2">📅 本日：{today}</p>

           <div className="flex justify-center items-center gap-2 sm:gap-8 bg-white p-4 rounded-xl shadow-md w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto font-sans mb-6">
           <Button
                className="min-w-[100px] sm:min-w-[120px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-gray-400 hover:bg-gray-500 transition"
                onClick={handleLogout}
              >ログアウト
           </Button>

           {userRole === "管理者" && (
           <Button
               className="min-w-[100px] sm:min-w-[120px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-orange-400 hover:bg-orange-500 transition"
               onClick={showAdminPage}
               >管理パネル
           </Button>
           )}

           <Button
               className="min-w-[100px] sm:min-w-[120px] px-5 py-2 rounded-xl text-stone-600 font-sans text-xs sm:text-sm md:text-base bg-orange-400 hover:bg-orange-500 transition"
               onClick={showPdcalist}
               >過去の記録
           </Button>
           </div>

           
            
            <Label 
                className="mt-6 text-xs md:text-base text-stone-600 font-sans"
                >P:今日は何をする予定ですか？
            </Label>
           
           <textarea
                className="w-full h-32 sm:h-36 p-3 sm:p-4 border border-stone-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans text-sm sm:text-base transition"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
           ></textarea>

           <Label
                className="mt-6 text-xs md:text-base text-stone-600 font-sans"
                >D:実際にどんなことをしましたか？
           </Label>

           <textarea
                className="w-full h-32 sm:h-36 p-3 sm:p-4 border border-stone-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans text-sm sm:text-base transition"
                value={doText}
                onChange={(e) => setDoText(e.target.value)}
           ></textarea>

           <Label
                className="mt-6 text-xs md:text-base text-stone-600 font-sans"
                >C:うまくいった事、できなかったことはどんなことですか？
           </Label> 

           <textarea
                className="w-full h-32 sm:h-36 p-3 sm:p-4 border border-stone-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans text-sm sm:text-base transition"
                value={check}
                onChange={(e) => setCheck(e.target.value)}
           ></textarea>

           <Label
                className="mt-6 text-xs md:text-base text-stone-600 font-sans"
                >A:次はどのように実行しますか？
           </Label> 

           <textarea
                className="w-full h-32 sm:h-36 p-3 sm:p-4 border border-stone-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 font-sans text-sm sm:text-base transition"
                value={action}
                onChange={(e) => setAction(e.target.value)}
           ></textarea>



          <div className="flex justify-between items-center p-4 mb-6 rounded-lg">
               <Button
                    onClick={handleClear}
                    className="w-32 sm:w-40 ml-2 sm:ml-16 mt-6 bg-gray-400 text-stone-600 px-4 py-2 rounded hover:bg-gray-500 transition font-sans"
                    >
                    クリア
               </Button>

               <Button
                    onClick={handleSave}
                    className="w-32 sm:w-40 mr-2 sm:mr-16 mt-6 text-stone-600 px-4 py-2 rounded bg-orange-400 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                    disabled={!isFormValid}
                    >
                    保存
               </Button>
          </div>

           {/* 保存しました！と表示 */}
           {isSaved && (
            <p className="mt-4 text-center text-green-600 font-sans">保存しました！</p>
           )}




           {/* 🟧通知を受け取るチェックボックス */}
           <div className="flex items-center gap-2 mt-4">
                <input
                    type="checkbox"
                    checked={notify}
                    onChange={(e) => setNotify(e.target.checked)}
                />
                <Label className="text-stone-600 font-sans">通知を受け取る</Label>
           </div>

          {notify && (
            <div className="mt-2">
                  <Label className="text-stone-600 font-sans">通知時刻を選んでください</Label>
                 <select
                       value={notifyTime}
                       onChange={(e) => setNotifyTime(e.target.value)}
                       className="mt-1 p-2 border rounded w-full font-sans focus:outline-none focus:ring-2 focus:ring-orange-600">
                     <option value="07:00">7:00</option>
                     <option value="08:00">8:00</option>
                     <option value="12:00">12:00</option>
                     <option value="18:00">18:00</option>
                     <option value="21:00">21:00</option>
                </select>
            </div>
           )}
      </div>
    );
  };
  
  export default TopPage;
