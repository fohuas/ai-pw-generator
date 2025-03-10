"use client";

import { useState, useEffect } from "react";
import { Copy, RefreshCw, Shield, Eye, EyeOff } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { cn } from "../lib/utils";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [strength, setStrength] = useState(0);

  // 生成密码的函数
  const generatePassword = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let newPassword = "";
    for (let i = 0; i < length[0]; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  // 计算密码强度
  const calculateStrength = (pass: string) => {
    let score = 0;
    
    // 长度评分
    score += Math.min(6, Math.floor(pass.length / 3));
    
    // 字符多样性评分
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 2;
    
    // 最终强度 (0-4)
    setStrength(Math.min(4, Math.floor(score / 2)));
  };

  // 复制密码到剪贴板
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 当选项改变时重新生成密码
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  // 获取强度对应的颜色和文本
  const getStrengthInfo = () => {
    const info = [
      { color: "bg-red-500", text: "非常弱" },
      { color: "bg-orange-500", text: "弱" },
      { color: "bg-yellow-500", text: "中等" },
      { color: "bg-green-500", text: "强" },
      { color: "bg-emerald-500", text: "非常强" }
    ];
    return info[strength];
  };

  const strengthInfo = getStrengthInfo();

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-0 shadow-xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-purple-500" />
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">密码生成器</CardTitle>
        </div>
        <CardDescription className="text-slate-500 dark:text-slate-400">生成安全、随机的密码</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="relative">
            <Input 
              id="password" 
              value={password} 
              readOnly 
              type={showPassword ? "text" : "password"}
              className="font-mono text-lg h-14 pr-24 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-inner transition-all"
            />
            <div className="absolute right-2 top-2 flex space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowPassword(!showPassword)}
                className="h-10 w-10 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {showPassword ? 
                  <EyeOff className="h-4 w-4 text-slate-500" /> : 
                  <Eye className="h-4 w-4 text-slate-500" />
                }
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyToClipboard}
                className={cn(
                  "h-10 w-10 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all",
                  copied && "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                )}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* 密码强度指示器 */}
          <div className="mt-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 dark:text-slate-400">密码强度</span>
              <span className="text-sm font-medium" style={{ color: strength > 2 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)' }}>
                {strengthInfo.text}
              </span>
            </div>
            <div className="flex space-x-1 h-1.5">
              {[0, 1, 2, 3, 4].map((index) => (
                <div 
                  key={index} 
                  className={cn(
                    "h-full flex-1 rounded-full transition-all duration-300",
                    index <= strength ? strengthInfo.color : "bg-slate-200 dark:bg-slate-700"
                  )}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="length" className="text-sm font-medium">密码长度</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setLength([Math.max(6, length[0] - 1)])}
                disabled={length[0] <= 6}
              >
                <span className="text-lg font-medium">-</span>
              </Button>
              <Input
                type="number"
                min={6}
                max={32}
                value={length[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 6 && value <= 32) {
                    setLength([value]);
                  }
                }}
                className="w-16 h-8 text-center font-medium bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setLength([Math.min(32, length[0] + 1)])}
                disabled={length[0] >= 32}
              >
                <span className="text-lg font-medium">+</span>
              </Button>
            </div>
          </div>
          <Slider
            id="length"
            min={6}
            max={32}
            step={1}
            value={length}
            onValueChange={setLength}
            className="py-1 mt-2"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>6</span>
            <span>32</span>
          </div>
        </div>

        <div className="space-y-3 pt-2 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">密码选项</h3>
          
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
            <Label htmlFor="uppercase" className="text-sm">包含大写字母 (A-Z)</Label>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${includeUppercase ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                {includeUppercase ? '已启用' : '已禁用'}
              </span>
              <Switch
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-200 dark:data-[state=unchecked]:bg-slate-700 transition-all duration-200 h-7 w-12"
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
            <Label htmlFor="numbers" className="text-sm">包含数字 (0-9)</Label>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${includeNumbers ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                {includeNumbers ? '已启用' : '已禁用'}
              </span>
              <Switch
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-200 dark:data-[state=unchecked]:bg-slate-700 transition-all duration-200 h-7 w-12"
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <Label htmlFor="symbols" className="text-sm">包含特殊字符 (!@#$)</Label>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${includeSymbols ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                {includeSymbols ? '已启用' : '已禁用'}
              </span>
              <Switch
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-200 dark:data-[state=unchecked]:bg-slate-700 transition-all duration-200 h-7 w-12"
              />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-6">
        <Button 
          onClick={generatePassword} 
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200 border-0"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          重新生成密码
        </Button>
      </CardFooter>
    </Card>
  );
} 