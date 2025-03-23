#include <stdio.h>

void main() {
	int tab[5] = {1, 2, 3, 4, 5};
	char *data[] = {"kelapa", "ayam"};

	int i;

	for (i = 0; i < sizeof(tab) / sizeof(tab[0]); i++) {
		printf("Tab%d = %d\n", i, tab[i]);
	};

	for (i = 0; i < sizeof(data) / sizeof(data[0]); i++) {
		printf("data %d = %s\n", i, data[i]);
	};
}
