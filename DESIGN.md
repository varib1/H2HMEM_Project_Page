# DESIGN.md

## 气质与意象
- **关键词**：学术严谨、结构清晰、信息密度高、交互式记忆网络
- **具象场景**：明亮的学术会议海报展板——白色底板上浮现清晰的图表与数据流，节点是记忆片段（文本、图像），连线是推理与应用路径。干净利落的排版，强调信息的精密感与层次感。

## 视觉策略
- 浅色主题（light mode），背景用浅灰白色（#f8f9fc），营造清爽学术感
- 图形语言：几何节点 + 连线 + 薄卡片，模拟记忆图谱结构
- 使用论文原始图片（comparison/pipeline/q/case_study）作为核心视觉元素
- 卡片使用白色背景 + 浅色边框，带微妙阴影

## 配色方案
- 背景：#ffffff（纯白）
- 内容区背景：#ffffff（纯白）/ #f9fafb（极浅灰渐变）
- 主色/强调色：#4f46e5（靛蓝）→ #7c3aed（紫罗兰）渐变
- 次强调色：#0ea5e9（天蓝）
- Recall 维度色：#10b981（翠绿）
- Reasoning 维度色：#f59e0b（琥珀）
- Application 维度色：#f43f5e（玫瑰红）
- 文字：#374151（中灰，不使用接近纯黑的颜色）
- 次要文字：#6b7280（灰色）
- 卡片边框：#e5e7eb（浅灰）

## 字体排版
- 标题字体：Inter（Google Fonts，使用 .cn 域名）
- 正文：系统 sans-serif
- 排版节奏：大标题 48-64px/700、小标题 24-32px/600、正文 16px/400、数据标注 14px/500

## 动效与交互
- 滚动淡入：各 section 使用 IntersectionObserver 触发 fade-up
- 卡片悬停：阴影加深
- 数据可视化：数字计数动画（count-up）
- 导航：顶部固定导航栏，滚动后背景变白+阴影

## 页面结构
1. Hero — 论文标题 + 副标题 + Comparison 图（Figure 1）
2. Abstract — 核心摘要
3. Key Contributions — 3 个贡献点，编号+卡片
4. Benchmark Overview — 数据集统计 + Pipeline 图（Figure 2）+ 交互类型对比
5. Task Taxonomy — Task 图（Figure 3）+ 三维度九任务卡片
6. Results — 四大发现 + 错误分布表 + 性能柱状图 + Case Study 图（Figure 4）
7. Conclusion — 总结
8. Footer — 导航链接

## 设计禁忌
- 禁止使用黑色/深色背景
- 禁止过度圆角（max 12px）
- 禁止 emoji
- 禁止深色卡片配浅色文字（应为白色卡片配深色文字）
- 禁止大面积纯色块，保持层次与纹理
