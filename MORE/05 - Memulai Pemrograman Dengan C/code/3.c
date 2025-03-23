#include <stdio.h>

void main() {
	int tab[5];
	int i;

	printf("\n");

	for (i = 0; i < sizeof(tab) / sizeof(tab[0]); i++) {
		printf("%d > ", i);
		scanf("%d", &tab[i]);
	};

	printf("\n\n");

	for (i = 0; i < sizeof(tab) / sizeof(tab[0]); i++) {
		printf("tab[%d] = %d\n", i, tab[i]);
	};

	printf("\n");
}
