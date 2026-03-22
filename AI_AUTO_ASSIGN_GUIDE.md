# 🤖 EduAI Pro v3 — AI Auto-Substitute Assignment System

## ✨ What's New

Your system now has **full AI automation** for substitute teacher assignment. When any staff member is absent, the AI automatically finds and assigns the best qualified substitute teacher without manual intervention.

---

## 🎯 How It Works

### **1. Automatic Triggers**
The AI auto-assign system activates in two scenarios:

#### **Scenario A: Absence Reported**
- Go to **🔄 Substitutes** → Report New Absence
- Select teacher, subject, class, period, date
- Click **"📋 Report Absence (AI will auto-assign)"**
- ✅ AI instantly analyzes available teachers and assigns the best match
- Notification shows **"🤖 AI AUTO-ASSIGNED: [Teacher Name]"**

#### **Scenario B: Leave Approved**
- Go to **🏖️ Leave Management**
- Admin approves a leave request
- ✅ AI automatically generates an absence entry and finds a substitute
- Same day, coverage is planned

---

## 🧠 AI Selection Algorithm

The AI uses this priority order to select the best substitute:

1. **Subject Match** (must teach the required subject)
2. **Lowest Workload** (≤7/10 is optimal)
3. **Highest Experience** (more years = better)
4. **Highest Rating** (teacher quality score)
5. **Availability Status** (must be available)

### Example
- **Absence**: Mr. David Wilson (Chemistry) absent for 10-A, Period 2
- **Available Teachers**: Dr. Sarah (Math/Stats), Ms. Emily (English), Mr. Alex (CS/Math)
- **Result**: System checks each teacher's availability and expertise
- **Best Match**: Mr. Alex (if available, has CS+Math, lower workload)

---

## 📊 Real-Time Monitoring

### Dashboard Updates
- **Dashboard** shows auto-assign status (Green: ON, Yellow: OFF)
- **Today's Absences** display substitute assignment status instantly
- **Notifications** alert you of AI assignments in real-time

### Substitutes Section
- Shows all absences with auto-assignment status
- You can still manually review and override AI recommendations
- Click **"🤖 AI Suggest"** to manually trigger analysis on any pending absence

---

## ⚙️ Settings & Configuration

### Enable/Disable Auto-Assign
1. Go to **⚙️ Settings**
2. Scroll to **🔔 Notification Settings**
3. Toggle **"Auto AI Suggest"** ON/OFF

**Default**: ON (auto-assignment enabled)

### What Gets Included
✅ 8 teachers across Science, Humanities, Technology, Languages, Sports  
✅ Real-time availability status (Available/Busy/On Leave)  
✅ Workload tracking (1-10 scale)  
✅ Subject expertise matching  
✅ Experience & rating scores  

---

## 🔑 API Key Required

Auto-assignment requires **Anthropic API Key**:

1. Get free key: [console.anthropic.com/keys](https://console.anthropic.com/keys)
2. Enter key in API Banner (top of page) or Settings
3. AI Assistant is instantly ready

**Without API Key**: Auto-assign won't run, but manual "AI Suggest" still works

---

## 📋 Workflow Examples

### **Case 1: Morning Absence Report**
```
8:00 AM → Admin reports Mr. David Wilson absent
       ↓
8:02 AM → AI analyzes: Ms. Emily (English) available, but needs Chem expert
       ↓
8:03 AM → AI assigns: Dr. Sarah (Chemistry expert, available, low workload)
       ↓
8:04 AM → Notification: "🤖 AI AUTO-ASSIGNED: Dr. Sarah → Chemistry (Class 10-A)"
```

### **Case 2: Leave Approval Auto-Coverage**
```
Coordinator approves: Ms. Maria Garcia - Personal leave (3 days)
       ↓
AI creates absence entry for all 3 days
       ↓
AI finds substitute for each day:
   - Day 1: Mr. Alex (CS/Math covers her Spanish classes)
   - Day 2: Mr. Raj Kumar (senior substitute)
   - Day 3: Dr. Sarah (if Alex busy)
       ↓
School is covered automatically for entire leave period
```

---

## 🎨 Visual Indicators

| Icon | Meaning |
|------|---------|
| 🟢 | **Available** - Teacher can substitute |
| 🔴 | **Pending** - Waiting for substitute assignment |
| ✅ | **Covered** - Substitute already assigned |
| 🤖 | **AI Assignment** - Done by Claude AI |
| ⚙️ | **Auto-Assign ON** - System is actively assigning |

---

## 🔄 Manual Override

Even with auto-assign enabled, you can:

1. **Review AI Choice**: Go to **🔄 Substitutes**
2. **See Recommendation**: AI shows the selected teacher with reasoning
3. **Assign Manually**: Click **"✅ Assign [Name]"** to confirm or
4. **AI Suggest Again**: Click **"🤖 AI Suggest"** to get fresh recommendations
5. **Change Substitute**: Click **"AI Suggest"** multiple times for alternatives

---

## 📈 Monitoring AI Performance

### Metrics Tracked
- ✅ Total auto-assignments completed
- ✅ Successful matches (subject expertise met)
- ✅ Average response time
- ✅ Workload distribution fairness
- ✅ Coverage rate vs. target

### Performance Dashboard
Go to **📈 Analytics** for:
- **Top Substitute Teachers** (usage frequency)
- **Teacher Workload** (distribution graph)
- **Staffing Recommendations** (AI hiring suggestions)

---

## 🛠️ Troubleshooting

### **Problem: Auto-assign not working**
✓ Check API Key is saved (Settings → API Key)  
✓ Verify "Auto AI Suggest" is toggled ON  
✓ Check internet connection  

### **Problem: No substitutes available**
✓ All available teachers might be busy
✓ AI shows: "No available substitutes found"
✓ Consider external substitute or reschedule

### **Problem: Wrong substitute assigned**
✓ Subject expertise mismatch (rare)
✓ Go to **🔄 Substitutes** → Click **"🤖 AI Suggest"** again
✓ AI will provide alternative recommendations

---

## 💡 Pro Tips

1. **Pre-set Availability**: Update teacher availability in **🟢 Availability** daily
2. **Monitor Workload**: Keep teacher workload ≤7/10 for optimal substitutions
3. **Review Notifications**: Check **🔔 Notifications** for all AI assignments
4. **Use Analytics**: Review **📈 Analytics** weekly for insights
5. **Leave in Advance**: Submit leaves early for better pre-planning

---

## 📞 Support

For issues or questions:
- Check help within each section (⚙️ Settings has detailed explanations)
- Review AI-generated messages in Notifications
- The system learns from your feedback and improves over time

---

**Version**: EduAI Pro v3.0  
**AI Powered By**: Claude (Anthropic)  
**Last Updated**: March 17, 2026  
