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
convert_fenced_code_blocks () {
  regex="s/(\s*)(\x60\x60\x60)(\w*?)\n(?=.*?{variables\..*?})(.+?)(\s*)(\x60\x60\x60)/\${1}<CodeBlock language='\${3}'>\n\${4}\${5}<\/CodeBlockpickle>/g"
  #regex="s/(\s*)(\x60\x60\x60)(\w*?)\n(?=.*{variables.*?\x60\x60\x60})(.+?)(\s*)(\x60\x60\x60)/\${1}<CodeBlock language='\${3}'>\n\${4}\${5}<\/CodeBlockpickle>/g"
  find_and_replace "$regex"
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

add_import_statements () {
  for path in "${base_dir[@]}"; do
    add_import_codeblocks "$path"
    add_import_variables "$path"
    find $path -type f -name "*.mdx" -exec perl -0777 -pi -e "s/;\n\nimport CodeBlock/;\nimport CodeBlock/s" {} +
  done
}

temp_rm_troublesome_files () {
  files=(
  recommended-metrics.mdx
  projectcalico.mdx
  )
  for file in "${files[@]}"; do
    find . -type f -name "*$file" -exec bash -c 'echo -e "---\ndescription: placeholder\n---\n\n# Placeholder text" > "{}"' \;
  done
}

# Uncomment for testing
git restore . && echo "git restore ."
#
echo "Converting global variables"
global_variables
echo "Converting global variables COMPLETE"
#exit
echo "Converting fenced code blocks"
convert_fenced_code_blocks
#echo "stop"
#exit
echo "Converting fenced code blocks COMPLETE"
#
echo "Adding import statements"
add_import_statements
echo "Adding import statements COMPLETE"

#echo "(You can run the MDX2 checker by uncommenting the final section in the script.))"
## Check for MDX errors on converted files
## npx docusaurus-mdx-checker -c calico && echo "Running MDX checker"   # check directory
## npx docusaurus-mdx-checker && echo "Running MDX checker              # check all
#sleep 2
#echo "Have a nice day!"

convert_componentImage_tokens
#
## [1] Wraps legit {{ vars }} and <user-supplied> in <Codeblocks/> with {' '}
#find_and_replace "s/(<CodeBlock.+)(\{\{.+?}})(.+<\/CodeBlock>)/\${1}\{'\${2}'}\${3}/gs"
#=find_and_replace "s/(<CodeBlock.+)(<your Istio version>)(.+<\/CodeBlock>)/\${1}\{'<your Istio version>'}\${3}/gs"
#I think this fixes an error in operations/upgrading/kubernetes-upgrade.mdx
find_and_replace "s/<your Istio version>/\{'<your Istio version>'}/gs"

echo "Dealing with troublesome files"
temp_rm_troublesome_files
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
npx docusaurus-mdx-checker  && echo "Running MDX checker"
exit