import {hello} from "@/hello";

describe('[Hello World]', () => {
    it('should work', () => {
        expect(hello()).toBe('world');
    });
});