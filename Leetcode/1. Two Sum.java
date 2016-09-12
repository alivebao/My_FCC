//https://leetcode.com/problems/two-sum/
public class Solution{
    public int[] twoSum(int[] numbers, int target){
        int[] result = new int[2];
        Map<Integer, Integer> map = new HashMap<Integer, Integer>();
        for(int i = 0 ; i < numbers.length ; ++i){
            if(map.containsKey(numbers[i])){
                result[0] = map.get(numbers[i]);
                result[1] = i;
                break;
            }
            map.put(target - numbers[i], i);
        }
        return result;
    }
}