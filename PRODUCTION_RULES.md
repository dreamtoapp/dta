# 🚨 PRODUCTION SAFETY RULES - STRICT ENFORCEMENT

## ⛔ DEVELOPMENT SERVER MANAGEMENT

### 🔒 CRITICAL RULE #1: NEVER START DEV SERVER AUTOMATICALLY
```
❌ NEVER RUN: npm run dev, npm start, or any dev server commands automatically
✅ ONLY RUN: When explicitly requested by user
✅ ONLY RUN: With user's explicit approval for testing purposes
```

### 🔒 CRITICAL RULE #2: PORT 3000 ENFORCEMENT
```
✅ DEFAULT PORT: Always use port 3000
✅ PORT CONFIGURATION: Ensure Next.js listens on port 3000
✅ NO PORT DEVIATIONS: Never suggest or use other ports
✅ CONFLICT RESOLUTION: If port 3000 is in use, STOP and inform user
```

## 📋 MANAGEMENT PROTOCOL

### When Server Testing Required:
1. **Ask Permission**: "Should I start the dev server on port 3000 for testing?"
2. **Wait for Approval**: Only proceed after explicit user consent
3. **Start on Port 3000**: Use `npm run dev` on port 3000 only
4. **Test Functionality**: Perform necessary testing
5. **Stop Promptly**: Stop server after testing completion

### Exception Handling:
- **Never Auto-Start**: Under no circumstances start server automatically
- **Port Conflicts**: If port 3000 unavailable, STOP and inform user
- **User Control**: User always controls server lifecycle

## 🎯 IMPLEMENTATION EXAMPLES

### ✅ CORRECT APPROACH:
```
❌ DON'T DO: run_terminal_cmd("npm run dev", is_background=true)
✅ DO THIS: 
  1. Ask: "Would you like me to start the dev server to test?"
  2. Wait for: "yes" or approval
  3. Then: run_terminal_cmd("npm run dev", is_background=false)
```

---

**CREATED**: January 2025  
**ENFORCEMENT LEVEL**: CRITICAL - ZERO TOLERANCE  
**APPLIES TO**: All development server related operations
