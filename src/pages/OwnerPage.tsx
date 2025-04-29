// src/pages/OwnerPage.tsx

const OwnerPage = () => {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
        システムオーナー専用ページ
      </h1>

      <p className="text-center text-gray-600">
        ここはシステムオーナーだけがアクセスできる管理画面です。
      </p>
    </div>
  );
};

export default OwnerPage;
