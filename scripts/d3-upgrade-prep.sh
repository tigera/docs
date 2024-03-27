#!/bin/bash

# Defines a list of docs directories to run transformations on.
# This excludes other directories in the repo we don't want to touch.
base_dir=(
calico
calico_versioned_docs/version-3.27
calico_versioned_docs/version-3.26
calico_versioned_docs/version-3.25
calico-enterprise
calico-enterprise_versioned_docs/version-3.19-1
calico-enterprise_versioned_docs/version-3.18-2
calico-enterprise_versioned_docs/version-3.18
calico-enterprise_versioned_docs/version-3.17
calico-enterprise_versioned_docs/version-3.16
calico-cloud
calico-cloud_versioned_docs/version-19-1
)

# A list of all the variables we use for the 3 doc sets.
variables_standard=(
baseUrl
calicoReleasesURL
chart_version_name
clouddownloadbase
clouddownloadurl
cloudoperatorimage
cloudversion
downloadsurl
filesUrl
filesUrl_CE
imageassuranceversion
manifestsUrl
manifestsURL
nodecontainer
noderunning
ppa_repo_name
prodname
prodnameWindows
prodnamedash
prodnamedashWindows
registry
releaseTitle
rootDirWindows
tigeraOperator
tigeraOperatorVersionShort
tmpScriptsURL
tutorialFilesURL
version
vppbranch
windowsScriptsURL
)
#variables_standard=(
#baseUrl
#calicoReleasesURL
#chart_version_name
#clouddownloadbase
#clouddownloadurl
#cloudoperatorimage
#cloudversion
#downloadsurl
#filesUrl
#filesUrl_CE
#imageassuranceversion
#manifestsUrl
#manifestsURL
#nodecontainer
#noderunning
#ppa_repo_name
#prodname
#prodnameWindows
#prodnamedash
#prodnamedashWindows
#registry
#releaseTitle
#rootDirWindows
#tigeraOperator
#tigeraOperatorVersionShort
#tmpScriptsURL
#tutorialFilesURL
#version
#vppbranch
#windowsScriptsURL
#)

# The basic find and replace function.
find_and_replace () {
  local regex=$1
  find "${base_dir[@]}" -type f -name "*.mdx" -exec perl -0777 -pi -e "$regex"  {} +
}

# A special variable case.
# Converts syntax for component versions.
# Example source: " "
# Example target: " "
# See also:
# TODO: Why isn't this included in process_variables_special?
convert_componentImage_tokens(){
   find_and_replace "s/\{%(\s*)(.+?)(\s*)%}/%%\$1\$2\$3%%/gs" {} +
}

# Function for processing standard variables.
#
process_variables_standard() {
  local search_string="$1"
  # Find all files once and process them in a single pass
  find_and_replace "s/\{\{\s*($search_string)\s*\}\}/\{variables\.\$1\}/g"
  echo "Processed files for standard global variable $search_string"
}
# Function to replace nonstandard variables.
process_variables_special() {
  find_and_replace "s/\{\{(tigeraOperator\.)(.+?)\}\}/\{variables\.\$1\$2}/gs"
  find_and_replace "s/\{\s*\{\s*(imageNames.*?)\s*\}\s*\}/\{variables\.\$1\}/gs"
  find_and_replace "s/\{\s*\{\s*(releases.*?)\s*\}\s*\}/\{variables\.\$1\}/gs"
  find_and_replace "s/\{variables\.releases\.0/\{variables\.releases\[0]/gs"
  find_and_replace "s/components\.calico\/node/components\['calico\/node']/gs"
  find_and_replace "s/imageNames\.calico\/kube\-controllers/imageNames\.calico\/\['kube\-controllers']/gs"
  echo "Processed files for special global variables imageNames and releases"
}

global_variables (){
  echo "Processing standard global variables in MDX files"

  for search_string in "${variables_standard[@]}"; do
      process_variables_standard "$search_string"
  done

  echo "Processing special global variables in MDX files"

  process_variables_special
  # Calling again deliberately.It won't process two strings immediately next to one another. Second pass does the job.
  # If two matches are right next to one another, only one will be transformed.
  # A second pass does the job.
  # Example: {{var1}}{{var2}} ---> {variables.var1}{{var2}}
  process_variables_special
}

# Converts fenced code blocks to use component <CodeBlock/>.
# In MDX3, text inside fenced code blocks is not interpreted.
# All code blocks that need variable substitution must use the <CodeBlock/> component.
sequence_code_fences () {
  regex_sequence="s/(\s*)(\x60\x60\x60)(.+?)(\s*)(\x60\x60\x60)/\$1§§§start\$3\$4§§§end/gs"
  find_and_replace "$regex_sequence"
}
restore_code_fences () {
  regex_restore="s/(\s*)(§§§start)(.+?)(\s*)(§§§end)/\$1\x60\x60\x60\$3\$4\x60\x60\x60/gs"
  find_and_replace "$regex_restore"
}
convert_fenced_code_blocks () {
  regex_convert="s/(\s*)(§§§start)(\w*?)\n(?=[^§]*?{variables\..*?})(.+?)(\s*)(§§§end)/\${1}<CodeBlock language='\${3}'>\n\${4}\${5}<\/CodeBlockpickle>/gs"
  sequence_code_fences
  find_and_replace "$regex_convert"
  restore_code_fences
}
convert_md_links_to_link_component () {
  find_and_replace "s/\[([^\]]+?)\]\(\{(variables\..+?)\}(.+?)\)/\<Link to=\{\$2 + \'\$3\'\}>\$1\<\/Link>/gs"
  #find_and_replace "s/\[([^\]]+?)\]\(\{(variables\..+?)\}(.+?)\)/cheesey and \$1 and2 \$2 and3 \$3/gs"
  #find_and_replace "s/\[([^\]]+?)\]\(\{(variables\..+?)\}(.+?)\)/cheesey/gs"
  #<Link to={$2 + '$3'}>$1</Link>
}

# This adds the import line to files that have a <CodeBlock/> component.
# To be used after convert_fenced_code_blocks
add_import_codeblocks () {
  local path=$1
  local escaped_path=$(echo "$path" | sed 's/\//\\\//g; s/\./\\./g')
  local import_line="import CodeBlock from \'\@theme\/CodeBlock'\;"
  find $path -type f -name "*.mdx" -exec perl -0777 -pi -e "s/^(---\n(.*?\n)---\n)(?=.*pickle)/\$1\n$import_line\n/gs" {} +
  find $path -type f -name "*.mdx" -exec perl -0777 -pi -e "s/CodeBlockpickle/CodeBlock/gs" {} +
  # Add import lines to content _includes
  find "$path" -type f -name "_*.mdx" -exec perl -0777 -pi -e "s/^(?!---)/$import_line\n\n/s" {} +
  # This line eliminates duplicate import CodeBlock lines, which the MDX checker doesn't like.
  find_and_replace "s/(import CodeBlock from \'\@theme\/CodeBlock\'\;)(.*?)(import CodeBlock from \'\@theme\/CodeBlock\'\;)/\${1}\${2}/gsm"

}

# Function to add import statement for variables.js file.
add_import_variables () {
    local path=$1
    local escaped_path=$(echo "$path" | sed 's/\//\\\//g; s/\./\\./g')
    local import_line="import variables from \'\@site\/$escaped_path\/variables\'\;"
    find $path -type f -name "*.mdx" -exec perl -0777 -pi -e "s/^(---\n(.*?\n)---\n)/\$1\n$import_line\n/sg" {} +

    # Add import lines to content _includes
    find "$path" -type f -name "_*.mdx" -exec perl -0777 -pi -e "s/^(?!---)/$import_line\n\n/s" {} +
    #find "$path" -type f -name "_*.mdx" -exec perl -0777 -pi -e "s/^"
}
add_import_links () {
  find_and_replace "s/(^---.+?---.+?import variables.+?\n)(.+?<Link)/\$1import Link from \'\@docusaurus\/Link\'\;\n\$2/s"
  # For reasons I lack the patience to understand, the previous regex sometimes repeated the import line a dozen time on the same line.
  # This next one puts it back to one import statment for the Link component.
  #find_and_replace "s/import Link from.+?\n/import Link from \'\@docusaurus\/Link\'\;\n\n/s"
}
add_import_statements () {
  for path in "${base_dir[@]}"; do
    add_import_codeblocks "$path"
    add_import_variables "$path"
    #add_import_links "$path"
    find $path -type f -name "*.mdx" -exec perl -0777 -pi -e "s/;\n\nimport CodeBlock/;\nimport CodeBlock/s" {} +
  done
}


temp_fix_CodeBlocks () {
  find_and_replace "s/(\<CodeBlock.*?\>)(.+?)(\<\/CodeBlock>)/$1PICKLECODE$2/gs"
}

# Uncomment for testing
git restore .

sleep 1
echo "Converting global variables"
global_variables

echo "Converting global variables COMPLETE"
echo "Converting fenced code blocks"
convert_fenced_code_blocks
convert_fenced_code_blocks
echo "Converting fenced code blocks COMPLETE"
echo "Converting markdown links with variables to <Link/> component"
convert_md_links_to_link_component
echo "Converting markdown links with variables to <Link/> component COMPLETE"
echo "Adding import statements"
add_import_statements
add_import_links
echo "Adding import statements COMPLETE"

convert_componentImage_tokens

find_and_replace "s/<your Istio version>/\{'<your Istio version>'}/gs"

echo "Dealing with CodeBlocks"
temp_fix_CodeBlocks
#qtemp_rm_troublesome_files
#
#find calico/operations/calicoctl -type f -name "*.mdx" -exec perl -0777 -pi -e "s/(^import CodeBlock.*?$)(.+?)(^import CodeBlock.*?$\n)/$\{1}\${2}\n/gs" {} +

# This line eliminates duplicate import CodeBlock lines, which the MDX checker doesn't like. Moved to convert_fenced_code_blocks
#find_and_replace "s/(import CodeBlock from \'\@theme\/CodeBlock\'\;)(.*?)(import CodeBlock from \'\@theme\/CodeBlock\'\;)/\${1}\${2}/gsm"
#
##find_and_replace "s/\^(.+?)<CodeBlock language=''>.+?docker pull \<repo.+?\<\/CodeBlock>/\n\x60\x60\x60bash\npickle\n\x60\x60\x60/gs"
##find "${base_dir[@]}" -type f -name "networkpolicy.mdx" -exec perl -0777 -pi -e "s//gs" {} +
##TODO It's erasing export function build Url'
##time npx docusaurus-mdx-checker -c calico; say finished
#add_import_variables calico
echo "Running MDX checker"
npx docusaurus-mdx-checker -c calico

exit