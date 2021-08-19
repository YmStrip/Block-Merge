# Block-Merge
MC的扩散合并，优化率在0.5~99.5%
# 完成时间 2020-9-15
# 逻辑串  Split->Layer(3).xyz -> SpreadBlock -> Sort () -> Res
# 逻辑串详细 
### Split => 将建筑分割成一大堆以完成巨大的建筑来合并，当然您可以设置分的数量，这个数量存在一个或多个最佳值
### Layer (3) .xyz => 对3维定义扩散序列，长度，相关逻辑，哈希表
### SpreadBlock => 迭代扩散
### Sort () => 一部分功能基于快排
### Res => 返回结构
# HolonsTree下的模型 
### BaseHolonsNode: {块,横块,立方块,组合立方块}
### UpChain Data=>Holons{x,y,z}=>块=>横块=>立方块=>组合立方块
