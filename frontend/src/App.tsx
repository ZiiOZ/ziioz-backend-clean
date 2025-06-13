<Routes>
  <Route
    path="/"
    element={/* your main homepage block */}
  />

  {/* ✅ Moved here: admin flag dashboard */}
  <Route
    path="/admin/flagged"
    element={
      localStorage.getItem('ziioz_admin') === 'true' ? (
        <ZiiFlagDashboard />
      ) : (
        <div className="min-h-screen flex items-center justify-center text-center text-red-600 p-8">
          🚫 Access Denied — You are not authorized to view this page.
        </div>
      )
    }
  />

  <Route path="/ziishop" element={<ZiiShop />} />
  <Route path="/ziiposts" element={<ZiiPostFeed />} />
  <Route path="/ziipay" element={<ZiiPay />} />
  <Route path="/settings" element={<Settings />} />
  <Route
    path="/admin"
    element={
      localStorage.getItem('ziioz_admin') === 'true' ? (
        <AdminDashboard />
      ) : (
        <div className="min-h-screen flex items-center justify-center text-center text-red-600 p-8">
          🚫 Access Denied — You are not authorized to view this page.
        </div>
      )
    }
  />
  <Route path="/auth" element={<AuthForm />} />
  <Route path="/privacy" element={<PrivacyPolicy />} />
  <Route path="/terms" element={<TermsOfUse />} />
</Routes>
