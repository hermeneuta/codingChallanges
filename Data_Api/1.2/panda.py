import pandas as pd

# Read the Excel file
df = pd.read_excel('populacja.xls')

# Write the DataFrame to a CSV file
df.to_csv('populacja.csv', index=False)
