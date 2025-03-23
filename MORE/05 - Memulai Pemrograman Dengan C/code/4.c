#include <stdio.h>

void main() {
	int i;
	int tab[10] = {1,231,421,52,12,434,755,32,213,234};
	int max;

	max = tab[0];
	
	for (i = 1; i < 10; i++) {
		if (tab[i] > max) {
			max = tab[i];
		};
	};

	printf("nilai max: %d\n", max);
}
